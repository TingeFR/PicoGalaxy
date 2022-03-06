import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Meal } from 'src/meals/entity/meal.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Menu {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiPropertyOptional({ type: () => [Meal] })
  @ManyToMany(() => Meal)
  @JoinTable()
  meals: Meal[];
}
