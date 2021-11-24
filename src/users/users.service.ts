import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserGroup } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(reqUser: User): Promise<User[]> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return this.usersRepository.find();
  }

  findById(reqUser: User, id: string): Promise<User> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.ADMIN){
      return this.usersRepository.findOne(id);
    }
    if(reqUser.id.toString() != id){
      throw new ForbiddenException("Access denied. Not the right user");
    }
    return this.usersRepository.findOne(id);
  }

  findByEmail(reqUser: User, email: string): Promise<User> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.ADMIN){
      return this.usersRepository.findOne({ where: {email: email}});
    }
    if(reqUser.email != email){
      throw new ForbiddenException("Access denied. Not the right user");
    }
    return this.usersRepository.findOne({ where: {email: email}});
  }

  findByEmailInsecure(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: {email: email}});
  }

  async loginSucceed(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: {email: email} });
    if(!user){
      return false;
    }
    return await bcrypt.compare(password, user.hashedPassword);
  }

  async create(reqUser: User, user: User) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return await this.usersRepository.save(user).catch(e => {
      if (e.code === '23505') {
        throw new ConflictException(`User ${user.email} already exists.`);
      }
      throw e;
    });
  }

  async update(reqUser: User, user: User) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.ADMIN){
      return await this.usersRepository.save(user).catch(e => {
        throw e;
      });
    }
    if(reqUser.id != user.id){
      throw new ForbiddenException("Access denied. Not the right user");
    }
    return await this.usersRepository.save(user).catch(e => {
      throw e;
    });
  }

  async remove(reqUser: User, id: string): Promise<void> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    await this.usersRepository.delete(id);
    return;
  }
}
