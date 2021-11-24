import { BadRequestException, Controller, Get, Logger, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags, ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService, private readonly usersService: UsersService) {}

  @Get('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: 'Create a token' })
  @ApiQuery({ name: 'password', type: String })
  @ApiQuery({ name: 'email', type: String })
  async login(
    @Query() q
  ) {
    const succeed = await this.usersService.loginSucceed(q.email, q.password)
    if (succeed) {
      Logger.log("Login succeeded!");
      const token = this.jwtService.sign({email: q.email})
      return { token }
    } else {
      Logger.warn('Login failed');
      throw new BadRequestException('Login failed');
    }
  }

  @Get('token')
  @ApiOperation({ summary: 'Test a token' })
  @ApiQuery({ name: 'token', type: String })
  testToken(
    @Query() q
  ) {
    if (this.jwtService.verify(q.token)) {
      Logger.log('token is valid');
    } else {
      Logger.warn('token is invalid');
      throw new BadRequestException('token is invalid');
    }
  }
}

