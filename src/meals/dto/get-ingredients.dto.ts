import { ApiResponseProperty } from "@nestjs/swagger";
import { Ingredient } from "../entity/ingredient.entity";

export class GetIngredientsDto {
  @ApiResponseProperty({ type: [Ingredient] })
  ingredients: Ingredient[];
}
