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

@Controller('invoices')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(JwtAtGuard)
  @Get()
  getInvoices() {
    return this.invoiceService.getInvoices();
  }

  @UseGuards(JwtAtGuard)
  @Get('/:id')
  getInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.getInvoiceById(id);
  }

  @UseGuards(JwtAtGuard)
  @Delete('/:id')
  deleteInvoiceById(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.deleteInvoiceById(id);
  }
}
