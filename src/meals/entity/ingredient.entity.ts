import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Meal } from './meal.entity';

@Entity()
export class Ingredient {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty()
  @Column()
  unit: string;

  @ApiProperty({ type: () => Meal })
  @ManyToOne(() => Meal, (meal) => meal.ingredients, { onDelete: 'CASCADE' })
  meal: Meal;
}
