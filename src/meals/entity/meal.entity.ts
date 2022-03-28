export enum MonthsOfYear {
  JANUARY = '1',
  FEBRUARY = '2',
  MARCH = '3',
  APRIL = '4',
  MAY = '5',
  JUNE = '6',
  JULY = '7',
  AUGUST = '8',
  SEPTEMBER = '9',
  OCTOBER = '10',
  NOVEMBER = '11',
  DECEMBER = '12',
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Step } from './step.entity';

@Entity()
export class Meal {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ enum: MonthsOfYear, enumName: 'MonthsOfYear', isArray: true })
  @Column({
    type: 'enum',
    enum: MonthsOfYear,
    array: true,
    default: [],
  })
  seasonMonths: MonthsOfYear[];

  @ApiProperty()
  @Column()
  preparationMinutes: number;

  @ApiProperty()
  @Column()
  cookingMinutes: number;

  @ApiProperty()
  @Column()
  kennyLoves: boolean;

  @ApiProperty()
  @Column()
  quentinLoves: boolean;

  @ApiPropertyOptional({ type: () => [Ingredient] })
  @OneToMany(() => Ingredient, (ingredient) => ingredient.meal)
  ingredients: Ingredient[];

  @ApiPropertyOptional({ type: () => [Step] })
  @OneToMany(() => Step, (step) => step.meal)
  steps: Step[];
}
