import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { UserResponseDto } from '../dto/user-response.dto.';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number; // integer number, increments on update

  @UpdateDateColumn({
    transformer: {
      to: (data: Date) => data,
      from: (data: Date) => data.getTime(),
    },
  })
  createdAt: number; // timestamp of creation

  @UpdateDateColumn({
    transformer: {
      to: (data: Date) => data,
      from: (data: Date) => data.getTime(),
    },
  })
  updatedAt: number; // timestamp of last update

  @Column({ nullable: true })
  refreshToken: string;

  toResponse(): UserResponseDto {
    return new UserResponseDto(this);
  }
}
