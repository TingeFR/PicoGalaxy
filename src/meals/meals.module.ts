import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entity/meal.entity';
import { MealMapper } from './dto/meal.mapper';
import { User } from 'src/users/entity/user.entity';
import { Ingredient } from './entity/ingredient.entity';
import { Step } from './entity/step.entity';
import { MealUpdater } from './dto/meal.updater';
import { IngredientMapper } from './dto/ingredient.mapper';
import { IngredientUpdater } from './dto/ingredient.updater';
import { StepMapper } from './dto/step.mapper';
import { StepUpdater } from './dto/step.updater';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User, Ingredient, Step])],
  providers: [MealsService, MealMapper, MealUpdater, IngredientMapper, IngredientUpdater, StepMapper, StepUpdater],
  controllers: [MealsController],
  exports: [MealsService],
})
export class MealsModule {}
