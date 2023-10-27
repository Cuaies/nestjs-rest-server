import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Provides a singleton instance of PrismaClient.
 */
@Injectable()
export class PrismaService extends PrismaClient {
  /**
   * Cleans the database.
   */
  cleanDb() {
    return this.user.deleteMany({});
  }
}
