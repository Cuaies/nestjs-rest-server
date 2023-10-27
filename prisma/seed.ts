import { PrismaClient } from '@prisma/client';
import { SeedData } from './ts/types';
import { seedData } from './seedData';
import { hashPassword } from '../src/core/utils';

const prisma = new PrismaClient();

async function main() {
  await seedDatabase(prisma, seedData);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/**
 * Seed the database with the seed data.
 */
export async function seedDatabase(
  prismaClient: PrismaClient = prisma,
  seedData: SeedData,
) {
  prismaClient.$transaction([
    prismaClient.user.deleteMany({}),

    ...(await createBulkInsertOperations(seedData)),
  ]);
}

/**
 * Creates bulk data operations to seed the database.
 */
async function createBulkInsertOperations(seedData: SeedData) {
  const { users, bills, invoices } = generateSeedData(seedData);

  return [
    prisma.user.createMany({ data: users }),
    prisma.bill.createMany({ data: bills }),
    prisma.invoice.createMany({ data: invoices }),
  ];
}

/**
 * Seed data formatting and processing.
 */
function generateSeedData(seedData: SeedData) {
  return {
    ...seedData,
    users: seedData.users.map(({ ...user }) => {
      user.password = hashPassword(user.password);
      return user;
    }),
  };
}
