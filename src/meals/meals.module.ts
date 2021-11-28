import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './entity/meal.entity';
import { MealMapper } from './dto/meal.mapper';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, User])],
  providers: [MealsService, MealMapper],
  controllers: [MealsController],
  exports: [MealsService],
})
export class MealsModule {}
