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

  @ApiProperty()
  @Column()
  preparationMinutes: number;

  @ApiProperty()
  @Column()
  cookingMinutes: number;

  @ApiPropertyOptional({ type: () => [Ingredient] })
  @OneToMany(() => Ingredient, ingredient => ingredient.meal)
  ingredients: Ingredient[];

  @ApiPropertyOptional({ type: () => [Step] })
  @OneToMany(() => Step, step => step.meal)
  steps: Step[];
}
