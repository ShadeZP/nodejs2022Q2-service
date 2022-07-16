import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserResponseDto {
  @IsString()
  id: string; // uuid v4

  @IsString()
  login: string;

  @IsString()
  @Exclude()
  password: string;

  @IsNumber()
  version: number; // integer number, increments on update

  @IsNumber()
  createdAt: number; // timestamp of creation

  @IsNumber()
  updatedAt: number; // timestamp of last update

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
