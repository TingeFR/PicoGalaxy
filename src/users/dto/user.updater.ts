import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserGroup } from '../entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserUpdater {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async map(
    reqUser: User,
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.keys(updateUserDto).forEach((element) => {
      // User
      if (!reqUser || reqUser.group == UserGroup.USER) {
        if (element == 'password') {
          user.hashedPassword = '';
        } else if (element == 'group') {
          return;
        } else if (element == 'isActive') {
          return;
        } else {
          user[element] = updateUserDto[element];
        }
      }
      // Admin
      else {
        if (element == 'password') {
          user.hashedPassword = '';
        } else {
          user[element] = updateUserDto[element];
        }
      }
    });

    if (updateUserDto.password) {
      user.hashedPassword = await bcrypt.hash(updateUserDto.password, 7);
    }

    return user;
  }
}
