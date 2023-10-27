import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO class used for logging in a user.
 */
export class LoginDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
