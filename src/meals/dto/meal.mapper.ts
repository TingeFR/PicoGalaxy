import { Injectable } from '@nestjs/common';
import { CreateMealDto } from './create-meal.dto';
import { Meal } from '../entity/meal.entity';
import { User, UserGroup } from 'src/users/entity/user.entity';

@Injectable()
export class MealMapper {
  async map(reqUser: User, createMealDto: CreateMealDto): Promise<Meal> {
    const {
      name,
      seasonMonths,
      preparationMinutes,
      cookingMinutes,
      kennyLoves,
      quentinLoves
    } = createMealDto;

    if(!reqUser || reqUser.group == UserGroup.USER){
      return;
    }

    return {
      id: null,
      name: name,
      seasonMonths: seasonMonths,
      preparationMinutes: preparationMinutes,
      cookingMinutes: cookingMinutes,
      kennyLoves: kennyLoves,
      quentinLoves: quentinLoves,
      ingredients: [],
      steps: [],
    };
  }
}
