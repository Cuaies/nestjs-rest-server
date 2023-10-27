import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAtGuard } from '../../../core/guards';
import { BillService } from './bill.service';

@Controller('bills')
export class BillController {
  constructor(private billService: BillService) {}

  @UseGuards(JwtAtGuard)
  @Get()
  getBills() {
    return this.billService.getBills();
  }

  @UseGuards(JwtAtGuard)
  @Get('/:id')
  getBillById(@Param('id', ParseIntPipe) id: number) {
    return this.billService.getBillById(id);
  }

  @UseGuards(JwtAtGuard)
  @Delete('/:id')
  deleteBillById(@Param('id', ParseIntPipe) id: number) {
    return this.billService.deleteBillById(id);
  }
}
