import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SeedData } from '../../../prisma/ts/types';
import { seedDatabase } from '../../../prisma/seed';

/**
 * Provides a singleton instance of PrismaClient.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Seeds the database with the seed data.
   */
  seedDatabase(seedData: SeedData) {
    return seedDatabase(this, seedData);
  }

  /**
   * Cleans the database.
   */
  cleanDb() {
    return this.user.deleteMany({});
  }
}
