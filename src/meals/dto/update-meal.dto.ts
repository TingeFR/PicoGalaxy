import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateMealDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  preparationMinutes?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  cookingMinutes?: number;
}