import { Injectable, NotFoundException } from '@nestjs/common';
import { Bill, Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class BillService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Retrieves all bills that belong to the user.
   */
  async getBills(user: User) {
    return this.prismaService.bill.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        amount: true,
        dueDate: true,
      },
    });
  }

  /**
   * Retrieves a bill by id, if it belongs to the user.
   */
  async getBillById(user: User, id: number) {
    const bill = await this.prismaService.bill.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!bill) {
      throw new NotFoundException();
    }

    return bill;
  }

  /**
   * Deletes a bill by id, if it belongs to the user.
   */
  async deleteBillById(user: User, id: number) {
    let bill: Bill;

    try {
      bill = await this.prismaService.bill.delete({
        where: {
          id,
          userId: user.id,
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
