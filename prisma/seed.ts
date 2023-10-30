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
  prismaClient.$transaction(async () => {
    await createBulkUpsertOperations(prismaClient, seedData);
  });
}

/**
 * Creates bulk data operations to seed the database with.
 */
async function createBulkUpsertOperations(
  prismaClient: PrismaClient,
  seedData: SeedData,
) {
  const { users, bills, invoices } = generateSeedData(seedData);

  for (const user of users) {
    const { id, ...userClone } = user;

    await prismaClient.user.upsert({
      where: {
        id: user.id,
      },
      create: {
        ...userClone,
      },
      update: {
        ...user,
      },
    });
  }

  for (const bill of bills) {
    const { id, ...billClone } = bill;

    await prismaClient.bill.upsert({
      where: {
        id: bill.id,
      },
      create: {
        ...billClone,
      },
      update: {
        ...bill,
      },
    });
  }

  for (const invoice of invoices) {
    const { id, ...invoiceClone } = invoice;

    await prismaClient.invoice.upsert({
      where: {
        id: invoice.id,
      },
      create: {
        ...invoiceClone,
      },
      update: {
        ...invoice,
      },
    });
  }
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
