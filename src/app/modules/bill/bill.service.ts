import { Injectable, NotFoundException } from '@nestjs/common';
import { Bill, Prisma } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class BillService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Retrieves all bills.
   */
  async getBills() {
    return this.prismaService.bill.findMany({
      select: {
        id: true,
        amount: true,
        dueDate: true,
      },
    });
  }

  /**
   * Retrieves a bill by id.
   */
  async getBillById(id: number) {
    const bill = await this.prismaService.bill.findUnique({
      where: {
        id,
      },
    });

    if (!bill) {
      throw new NotFoundException();
    }

    return bill;
  }

  /**
   * Deletes a bill by id.
   */
  async deleteBillById(id: number) {
    let bill: Bill;

    try {
      bill = await this.prismaService.bill.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2025'
      ) {
        throw new NotFoundException();
      }
    }

    return bill;
  }
}
