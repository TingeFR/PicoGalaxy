import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entity/meal.entity';
import { MealCreator } from './dto/meal.creator';
import { User } from 'src/users/entity/user.entity';
import { Ingredient } from './entity/ingredient.entity';
import { Step } from './entity/step.entity';
import { MealUpdater } from './dto/meal.updater';
import { IngredientCreator } from './dto/ingredient.creator';
import { IngredientUpdater } from './dto/ingredient.updater';
import { StepCreator } from './dto/step.creator';
import { StepUpdater } from './dto/step.updater';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User, Ingredient, Step])],
  providers: [
    MealsService,
    MealCreator,
    MealUpdater,
    IngredientCreator,
    IngredientUpdater,
    StepCreator,
    StepUpdater,
  ],
  controllers: [MealsController],
  exports: [MealsService],
})
export class MealsModule {}
