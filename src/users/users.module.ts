import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { UserMapper } from './dto/user.mapper';
import { UserUpdater } from './dto/user.updater';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserMapper, UserUpdater],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
