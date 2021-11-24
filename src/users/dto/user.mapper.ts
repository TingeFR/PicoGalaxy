import { Injectable } from '@nestjs/common';
import { User, UserGroup } from '../entity/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserMapper {
  async map(reqUser: User, createUserDto: CreateUserDto): Promise<User> {
    const {
      group,
      email,
      password,
      firstName,
      lastName,
      isActive
    } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 7)
    if(!reqUser || reqUser.group == UserGroup.USER){
      return;
    }

    return {
      id: null,
      group: group,
      email: email,
      hashedPassword: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      isActive: isActive
    };
  }
}