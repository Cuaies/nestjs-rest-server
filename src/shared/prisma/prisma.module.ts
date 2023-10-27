import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * Represents an adapter for `PrismaService` to be used as a global module.
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
