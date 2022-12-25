import { TransactionType } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddTransaction } from './dto/addTransation.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  calculateBalance(
    data: { transactionType: TransactionType; amount: number }[],
  ) {
    return data.reduce((total, data) => {
      if (data.transactionType === 'CREDIT') {
        return total + data.amount;
      } else if (data.transactionType === 'DEBIT') {
        return total - data.amount;
      }
    }, 0);
  }

  async getUserTransation(userId: string) {
    return await this.prisma.transaction.findMany({
      where: {
        userId,
      },
    });
  }
  async getTransationById(userId: string, transactionId: string) {
    return await this.prisma.transaction.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
  }

  async addTransation(userId: string, dto: AddTransaction) {
    const newTransation = await this.prisma.transaction.create({
      data: {
        userId,
        ...dto,
      },
    });

    return newTransation;
  }

  async getUserBalance(userId: string) {
    const balance = await this.prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      select: {
        amount: true,
        transactionType: true,
      },
    });
    if (balance) {
      const bal = this.calculateBalance(balance);
      return bal;
    }
  }
}
