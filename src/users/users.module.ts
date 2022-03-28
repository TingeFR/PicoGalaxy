import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { UserCreator } from './dto/user.creator';
import { UserUpdater } from './dto/user.updater';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UserCreator, UserUpdater],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
