import {
  Body,
  Logger,
  NotFoundException,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserCreator } from './dto/user.creator';
import { UserUpdater } from './dto/user.updater';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  private readonly logger: Logger;

  constructor(
    private readonly usersService: UsersService,
    private readonly userCreator: UserCreator,
    private readonly userUpdater: UserUpdater,
  ) {
    this.logger = new Logger(UsersController.name);
  }

  //GET /users
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List users' })
  @ApiOkResponse({
    description: 'User list',
    type: GetUsersDto,
  })
  async findAll(@Req() r, @Query() q): Promise<GetUsersDto> {
    const users = await this.usersService.findAll(r.user);
    return { users };
  }

  //GET /users/id/{id}
  @Get('/id/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Get one user with its id' })
  async findById(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ): Promise<User> {
    const user = await this.usersService.findById(r.user, id);
    if (user) {
      return user;
    }
    Logger.error(`Unknown user id: ${id}`);
    throw new NotFoundException('User not found');
  }

  //GET /users/email/{email}
  @Get('/email/:email')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'User',
    type: User,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Get one user with its email' })
  async findByEMail(
    @Req() r,
    @Param(
      'email',
      new ValidationPipe({
        transform: true,
      }),
    )
    email: string,
  ): Promise<User> {
    const user = await this.usersService.findByEmail(r.user, email);
    if (user) {
      return user;
    }
    Logger.error(`Unknown user email: ${email}`);
    throw new NotFoundException('User not found');
  }

  //POST /users
  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create a new user' })
  @ApiConflictResponse({ description: 'User already exists' })
  @ApiOperation({ summary: 'Create a new user' })
  async create(
    @Req() r,
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    user: CreateUserDto,
  ) {
    const newUser = await this.userCreator.map(r.user, user);
    return this.usersService.create(r.user, newUser);
  }

  //PUT /users/{id}
  @Put('/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update a user' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiOperation({ summary: 'Update a user' })
  async update(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    user: UpdateUserDto,
  ) {
    const updatedUser = await this.userUpdater.map(r.user, id, user);
    return this.usersService.update(r.user, updatedUser);
  }

  //DELETE /users/{id}
  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove user' })
  async remove(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ) {
    const user = await this.usersService.findById(r.user, id);
    if (user) {
      return await this.usersService.remove(r.user, id);
    }
    Logger.error(`Unknown user id: ${id}`);
    throw new NotFoundException('User not found');
  }
}
