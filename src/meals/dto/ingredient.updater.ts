import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateIngredientDto } from './update-ingredient.dto';
import { Ingredient } from '../entity/ingredient.entity';
import { User, UserGroup } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientUpdater {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>
  ) {}

  async map(reqUser: User, id: string, updateIngredientDto: UpdateIngredientDto): Promise<Ingredient> {

    if(!reqUser || reqUser.group == UserGroup.USER){
      return;
    }

    const ingredient = await this.ingredientsRepository.findOne(id);

    if(!ingredient)
    {
      throw new NotFoundException('Ingredient not found');
    }

    Object.keys(updateIngredientDto).forEach(element => {
      ingredient[element] = updateIngredientDto[element];
    });

    return ingredient;
  }
}
