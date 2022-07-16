import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  oldPassowrd: string; // previous password

  @IsString()
  newPassword: string; // new password
}
