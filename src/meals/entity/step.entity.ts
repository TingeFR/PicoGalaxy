import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Meal } from './meal.entity';

@Entity()
export class Step {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  desc: string;

  @ApiProperty({ type: () => Meal })
  @ManyToOne(() => Meal, meal => meal.ingredients, { onDelete: "CASCADE" })
  meal: Meal;

}