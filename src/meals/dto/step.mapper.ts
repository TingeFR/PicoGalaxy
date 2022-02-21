import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserGroup } from 'src/users/entity/user.entity';
import { CreateStepDto } from './create-step.dto';
import { Step } from '../entity/step.entity';
import { Meal } from '../entity/meal.entity';

@Injectable()
export class StepMapper {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}
  async map(reqUser: User, createStepDto: CreateStepDto): Promise<Step> {
    const {
      mealId,
      name,
      desc
    } = createStepDto;

    if(!reqUser || reqUser.group == UserGroup.USER){
      return;
    }

    const meal = await this.mealsRepository.findOne(mealId);
    if(!meal)
    {
      throw new NotFoundException('Meal not found');
    }

    return {
      id: null,
      name: name,
      desc: desc,
      meal: meal
    };
  }
}