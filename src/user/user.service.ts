import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto.';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = {
      ...createUserDto,
    };
    const createdUser = this.userRepository.create(user);

    return (await this.userRepository.save(createdUser)).toResponse();
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();

    return users.map((user) => user.toResponse());
  }

  async findOne(userId: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`There is no user with id: ${userId}`);
    }

    return user.toResponse();
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user: User = await await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(`Wrong old password`);
    }
    const updatedUser = {
      ...user,
      password: updatePasswordDto.newPassword,
    };

    const res = await this.userRepository.save(updatedUser);
    return new UserResponseDto(res);
  }

  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    }
  }
}
