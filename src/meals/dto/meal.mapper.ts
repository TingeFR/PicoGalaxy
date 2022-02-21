import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './create-meal.dto';
import { Meal } from '../entity/meal.entity';
import { User, UserGroup } from 'src/users/entity/user.entity';

@Injectable()
export class MealMapper {
  async map(reqUser: User, createMealDto: CreateMealDto): Promise<Meal> {
    const {
      name,
      preparationMinutes,
      cookingMinutes,
    } = createMealDto;

    if(!reqUser || reqUser.group == UserGroup.USER){
      return;
    }

    return {
      id: null,
      name: name,
      preparationMinutes: preparationMinutes,
      cookingMinutes: cookingMinutes,
      ingredients: [],
      steps: [],
    };
  }
}
