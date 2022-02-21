import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMealDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  preparationMinutes: number;

  @ApiProperty()
  @IsNumber()
  cookingMinutes: number;
}