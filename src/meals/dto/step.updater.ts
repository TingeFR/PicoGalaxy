import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateStepDto } from './update-step.dto';
import { Step } from '../entity/step.entity';
import { User, UserGroup } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StepUpdater {
  constructor(
    @InjectRepository(Step)
    private stepsRepository: Repository<Step>
  ) {}

  async map(reqUser: User, id: string, updateStepDto: UpdateStepDto): Promise<Step> {

    if(!reqUser || reqUser.group == UserGroup.USER){
      return;
    }

    const step = await this.stepsRepository.findOne(id);

    if(!step)
    {
      throw new NotFoundException('Step not found');
    }

    Object.keys(updateStepDto).forEach(element => {
      step[element] = updateStepDto[element];
    });

    return step;
  }
}
