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
import { AuthenticatedUser } from '../../../core/decorators';
import { User } from '@prisma/client';

@Controller('bills')
export class BillController {
  constructor(private billService: BillService) {}

  @UseGuards(JwtAtGuard)
  @Get()
  getBills(@AuthenticatedUser() user: User) {
    return this.billService.getBills(user);
  }

  @UseGuards(JwtAtGuard)
  @Get('/:id')
  getBillById(
    @AuthenticatedUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.billService.getBillById(user, id);
  }

  @UseGuards(JwtAtGuard)
  @Delete('/:id')
  deleteBillById(
    @AuthenticatedUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.billService.deleteBillById(user, id);
  }
}
