import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAtGuard } from '../../../core/guards';
import { AuthenticatedUser } from '../../../core/decorators';
import { User } from '@prisma/client';

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(JwtAtGuard)
  @Get()
  getInvoices(@AuthenticatedUser() user: User) {
    return this.invoiceService.getInvoices(user);
  }

  @UseGuards(JwtAtGuard)
  @Get('/:id')
  getInvoiceById(
    @AuthenticatedUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.invoiceService.getInvoiceById(user, id);
  }

  @UseGuards(JwtAtGuard)
  @Delete('/:id')
  deleteInvoiceById(
    @AuthenticatedUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.invoiceService.deleteInvoiceById(user, id);
  }
}
