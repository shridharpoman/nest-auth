import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthSignInDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @IsNotEmpty()
  @IsOptional()
  lastName: string;
}
