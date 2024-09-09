import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
