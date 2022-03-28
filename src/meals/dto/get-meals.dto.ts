import { ApiResponseProperty } from '@nestjs/swagger';
import { Meal } from '../entity/meal.entity';

export class GetMealsDto {
  @ApiResponseProperty({ type: [Meal] })
  meals: Meal[];
}
