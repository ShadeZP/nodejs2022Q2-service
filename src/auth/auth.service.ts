import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { signupResponse } from './interfaces/signup-response';
import { Tokens } from './interfaces/tokens.interface';
import { JwtPayload } from './interfaces/jwt-payload.type';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserResponseDto } from 'src/user/dto/user-response.dto.';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<signupResponse> {
    const hashPassport = await this.hashData(createUserDto.password);
    const userWithHash: CreateUserDto = {
      ...createUserDto,
      password: hashPassport,
    };

    const createdUser = this.userRepository.create(userWithHash);

    const user = (await this.userRepository.save(createdUser)).toResponse();
    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user, tokens.refreshToken);

    return {
      ...user,
      ...tokens,
    };
  }

  async login(createUserDto: CreateUserDto): Promise<signupResponse> {
    const user: User = await this.userRepository.findOne({
      where: { login: createUserDto.login },
    });
    console.log('userlogin', user);
    if (!user)
      throw new ForbiddenException(
        `no user with such login, password doesn't match actual one`,
      );

    const passwordMatches = await bcrypt.compare(
      createUserDto.password,
      user.password,
    );

    console.log('passwordMatches', passwordMatches);

    if (!passwordMatches)
      throw new ForbiddenException(
        `no user with such login, password doesn't match actual one`,
      );

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user, tokens.refreshToken);

    return {
      ...user,
      ...tokens,
    };
  }

  async refresh(userId: string, rt: string): Promise<signupResponse> {
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }
    const rtMatches = await bcrypt.compare(user.refreshToken, rt);

    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRefreshToken(user, tokens.refreshToken);

    return {
      ...user,
      ...tokens,
    };
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }

  private async getTokens(userId: string, login: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      userId,
      login,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>(process.env.AT_SECRET),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>(process.env.RT_SECRET),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshToken(user: UserResponseDto, rt: string) {
    const hashRT = await this.hashData(rt);

    const updatedUser = {
      ...user,
      refreshToken: hashRT,
    };

    const updated = await this.userRepository.save(updatedUser);
    console.log('updated', updated);
    return updated;
  }
}
