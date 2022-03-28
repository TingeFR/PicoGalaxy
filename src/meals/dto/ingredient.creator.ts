import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserGroup } from 'src/users/entity/user.entity';
import { CreateIngredientDto } from './create-ingredient.dto';
import { Ingredient } from '../entity/ingredient.entity';
import { Meal } from '../entity/meal.entity';

@Injectable()
export class IngredientCreator {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}
  async map(
    reqUser: User,
    createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    if (!reqUser || reqUser.group == UserGroup.USER) {
      return;
    }

    const meal = await this.mealsRepository.findOne(createIngredientDto.mealId);
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return {
      id: null,
      name: createIngredientDto.name,
      quantity: createIngredientDto.quantity,
      unit: createIngredientDto.unit,
      meal: meal,
    };
  }
}
