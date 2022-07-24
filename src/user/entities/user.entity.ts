import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserResponseDto } from '../dto/user-response.dto.';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number; // integer number, increments on update

  @Column()
  createdAt: number; // timestamp of creation

  @Column()
  updatedAt: number; // timestamp of last update

  toResponse(): UserResponseDto {
    return new UserResponseDto(this);
  }
}
