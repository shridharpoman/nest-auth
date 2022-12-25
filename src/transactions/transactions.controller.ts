import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AddTransaction } from './dto/addTransation.dto';
import { TransactionsService } from './transactions.service';

@UseGuards(AuthGuard('jwt'))
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  addTransation(@Req() req: Request, @Body() dto: AddTransaction) {
    const user = req.user;
    return this.transactionService.addTransation(user['sub'], dto);
  }

  @Get(':id')
  getTransationById(
    @Req() req: Request,
    @Param('id', ParseUUIDPipe) transactionId: string,
  ) {
    const user = req.user;
    return this.transactionService.getTransationById(
      user['sub'],
      transactionId,
    );
  }

  @Get('/get/me')
  getUserTransation(@Req() req: Request) {
    const user = req.user;
    return this.transactionService.getUserTransation(user['sub']);
  }

  @Get('/get/balance')
  getUserBalance(@Req() req: Request) {
    const user = req.user;
    return this.transactionService.getUserBalance(user['sub']);
  }
}
