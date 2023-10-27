import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SeedData } from '../../../prisma/ts/types';

/**
 * Provides a singleton instance of PrismaClient.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Seeds the database with the seed data.
   */
  seedDatabase(seedData: SeedData) {
    return this.seedDatabase(seedData);
  }
}
