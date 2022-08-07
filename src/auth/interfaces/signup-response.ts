import { UserResponseDto } from 'src/user/dto/user-response.dto.';
import { Tokens } from './tokens.interface';

export type signupResponse = UserResponseDto & Tokens;
