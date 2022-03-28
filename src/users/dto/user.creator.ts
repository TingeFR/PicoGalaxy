import { Injectable } from '@nestjs/common';
import { User, UserGroup } from '../entity/user.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCreator {
  async map(reqUser: User, createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    if (!reqUser || reqUser.group == UserGroup.USER) {
      return;
    }

    return {
      id: null,
      group: createUserDto.group,
      email: createUserDto.email,
      hashedPassword: hashedPassword,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      isActive: createUserDto.isActive,
    };
  }
}
