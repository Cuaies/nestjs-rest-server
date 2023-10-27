import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice, Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Retrieves all invoices that belong to the user.
   */
  async getInvoices(user: User) {
    return this.prismaService.invoice.findMany({
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
   * Retrieves an invoice by it's id, if it belongs to the user.
   */
  async getInvoiceById(user: User, id: number) {
    const invoice = await this.prismaService.invoice.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!invoice) {
      throw new NotFoundException();
    }

    return invoice;
  }

  /**
   * Deletes an invoice by it's id, if it belongs to the user.
   */
  async deleteInvoiceById(user: User, id: number) {
    let invoice: Invoice;

    try {
      invoice = await this.prismaService.invoice.delete({
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

    return invoice;
  }
}
