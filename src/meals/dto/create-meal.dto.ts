import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { MonthsOfYear } from "../entity/meal.entity";

export class CreateMealDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ enum: MonthsOfYear, enumName: 'MonthsOfYear', isArray: true })
  @IsOptional()
  @IsEnum(MonthsOfYear, { each: true })
  seasonMonths?: MonthsOfYear[];

  @ApiProperty()
  @IsNumber()
  preparationMinutes: number;

  @ApiProperty()
  @IsNumber()
  cookingMinutes: number;

  @ApiProperty()
  @IsBoolean()
  kennyLoves: boolean;

  @ApiProperty()
  @IsBoolean()
  quentinLoves: boolean;
}