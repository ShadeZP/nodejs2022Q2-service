import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserDB } from 'src/db/db';
import { addEntityToDB } from 'src/utils/add-entity';
import { getAllFromDB } from 'src/utils/get-all-entities';
import { removeEntityFromDB } from 'src/utils/remove-entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto.';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user: User = {
      ...createUserDto,
      id: randomUUID(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addEntityToDB<User>(UserDB, user);

    return new UserResponseDto(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await getAllFromDB<User>(UserDB);

    return users.map((user) => new UserResponseDto(user));
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await UserDB.entities[id];

    return new UserResponseDto(user);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user: User = await UserDB.entities[id];

    if (user.password !== updatePasswordDto.oldPassowrd) {
      throw new ForbiddenException(`Wrong old password`);
    }

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
      updatedAt: Date.now(),
    };

    UserDB.entities[id] = updatedUser;

    return new UserResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user: User = await UserDB.entities[id];

    if (!user) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }

    await removeEntityFromDB(UserDB, id);
  }
}
