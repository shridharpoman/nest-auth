import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TransactionTypes } from '../types';

export class AddTransaction {
  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionTypes)
  transactionType: TransactionTypes;

  @IsOptional()
  @MaxLength(15)
  category: string;

  @IsNotEmpty()
  amount: number;
}
