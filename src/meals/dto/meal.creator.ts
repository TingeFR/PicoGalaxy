import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './create-meal.dto';
import { Meal } from '../entity/meal.entity';
import { User, UserGroup } from 'src/users/entity/user.entity';

@Injectable()
export class MealCreator {
  async map(reqUser: User, createMealDto: CreateMealDto): Promise<Meal> {
    if (!reqUser || reqUser.group == UserGroup.USER) {
      return;
    }

    return {
      id: null,
      name: createMealDto.name,
      seasonMonths: createMealDto.seasonMonths,
      preparationMinutes: createMealDto.preparationMinutes,
      cookingMinutes: createMealDto.cookingMinutes,
      kennyLoves: createMealDto.kennyLoves,
      quentinLoves: createMealDto.quentinLoves,
      ingredients: [],
      steps: [],
    };
  }
}
