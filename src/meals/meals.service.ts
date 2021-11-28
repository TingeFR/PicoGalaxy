import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { Meal } from './entity/meal.entity';

@Injectable()
export class MealsService {
  constructor(
      @InjectRepository(Meal)
      private mealsRepository: Repository<Meal>,
  ) {}

  findAll(reqUser: User): Promise<Meal[]> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    return this.mealsRepository.find();
  }

}
