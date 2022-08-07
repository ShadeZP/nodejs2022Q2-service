import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { RtGuard } from 'src/common/guards/rt.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { signupResponse } from './interfaces/signup-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<signupResponse> {
    const res = await this.authService.signup(createUserDto);
    return res;
  }

  @Public()
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<signupResponse> {
    const res = await this.authService.login(createUserDto);
    return res;
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refresh(@Request() req: any) {
    const { user, refreshToken } = req;
    const res = await this.authService.refresh(user.id, refreshToken);
    return res;
  }
}
