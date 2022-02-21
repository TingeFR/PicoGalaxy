import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMealDto } from './update-meal.dto';
import { Meal } from '../entity/meal.entity';
import { User, UserGroup } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { inspectorMode } from 'src/libs/utils';

@Injectable()
export class MealUpdater {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>
  ) {}

  async map(reqUser: User, id: string, updateMealDto: UpdateMealDto): Promise<Meal> {

    const meal = await this.mealsRepository.findOne(id);
    inspectorMode(meal)

    if(!meal)
    {
      throw new NotFoundException('Meal not found');
    }

    Object.keys(updateMealDto).forEach(element => {
      // User
      if(!reqUser || reqUser.group == UserGroup.USER){
        return;
      }
      // Admin
      else{
        meal[element] = updateMealDto[element];
      }
    });

    return meal;
  }
}
