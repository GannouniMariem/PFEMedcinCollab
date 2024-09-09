import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignupDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  public firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  public lastName: string;

  @IsString({ message: 'Specialty must be a string' })
  public specialty?: string;

  @IsString({ message: 'Company name must be a string' })
  public companyName?: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  public phoneNumber: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  public email: string;

  @IsNotEmpty({ message: 'Professional address is required' })
  @IsString({ message: 'Professional address must be a string' })
  public professionalAddress: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString({ message: 'City must be a string' })
  public city: string;

  @IsNotEmpty({ message: 'Postal code is required' })
  @IsString({ message: 'Postal code must be a string' })
  public postalCode: string;
}
