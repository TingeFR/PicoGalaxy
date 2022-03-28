import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: 'Create a token' })
  async login(
    @Req() r,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    login: LoginDto,
  ) {
    const succeed = await this.usersService.loginSucceed(
      login.email,
      login.password,
    );

    if (succeed) {
      Logger.log('Login succeeded!');
      const token = this.jwtService.sign({ email: login.email });
      return { token };
    } else {
      Logger.warn('Login failed');
      throw new BadRequestException('Login failed');
    }
  }

  @Get('token')
  @ApiOperation({ summary: 'Test a token' })
  @ApiQuery({ name: 'token', type: String })
  testToken(@Query() q) {
    if (this.jwtService.verify(q.token)) {
      Logger.log('token is valid');
    } else {
      Logger.warn('token is invalid');
      throw new BadRequestException('token is invalid');
    }
  }
}
