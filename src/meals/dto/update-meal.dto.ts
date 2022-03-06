import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { MonthsOfYear } from "../entity/meal.entity";

export class UpdateMealDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ enum: MonthsOfYear, enumName: 'MonthsOfYear', isArray: true })
  @IsOptional()
  @IsEnum(MonthsOfYear, { each: true })
  seasonMonths?: MonthsOfYear[];

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  preparationMinutes?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  cookingMinutes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  kennyLoves?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  quentinLoves?: boolean;
}