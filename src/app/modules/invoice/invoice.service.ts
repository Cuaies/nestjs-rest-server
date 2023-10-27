import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice, Prisma } from '@prisma/client';
import { PrismaService } from '../../../shared/prisma/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Retrieves all invoices.
   */
  async getInvoices() {
    return this.prismaService.invoice.findMany({
      select: {
        id: true,
        amount: true,
        dueDate: true,
      },
    });
  }

  /**
   * Retrieves an invoice by it's id.
   */
  async getInvoiceById(id: number) {
    const invoice = await this.prismaService.invoice.findUnique({
      where: {
        id,
      },
    });

    if (!invoice) {
      throw new NotFoundException();
    }

    return invoice;
  }

  /**
   * Deletes an invoice by it's id.
   */
  async deleteInvoiceById(id: number) {
    let invoice: Invoice;

    try {
      invoice = await this.prismaService.invoice.delete({
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

    return invoice;
  }
}
