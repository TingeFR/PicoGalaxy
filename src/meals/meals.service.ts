import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserGroup } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { Meal } from './entity/meal.entity';
import { Ingredient } from './entity/ingredient.entity';
import { Step } from './entity/step.entity';

@Injectable()
export class MealsService {
  constructor(
      @InjectRepository(Meal)
      private mealsRepository: Repository<Meal>,
      @InjectRepository(Ingredient)
      private ingredientsRepository: Repository<Ingredient>,
      @InjectRepository(Step)
      private stepsRepository: Repository<Step>,
  ) {}

  findAll(reqUser: User): Promise<Meal[]> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return this.mealsRepository.find({relations: ['ingredients', 'steps']});
  }

  findById(reqUser: User, id: string): Promise<Meal> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return this.mealsRepository.findOne(id, {relations: ['ingredients', 'steps']});
  }

  async create(reqUser: User, meal: Meal) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.ADMIN){
      return await this.mealsRepository.save(meal).catch(e => {
        if (e.code === '23505') {
          throw new ConflictException(`Meal ${meal.id} already exists.`);
        }
        throw e;
      });
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return await this.mealsRepository.save(meal).catch(e => {
      if (e.code === '23505') {
        throw new ConflictException(`Meal ${meal.id} already exists.`);
      }
      throw e;
    });
  }

  async update(reqUser: User, meal: Meal) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return await this.mealsRepository.save(meal).catch(e => {
      throw e;
    });
  }

  async remove(reqUser: User, id: string): Promise<void> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    await this.mealsRepository.delete(id);
    return;
  }

  findAllIngredients(reqUser: User): Promise<Ingredient[]> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return this.ingredientsRepository.find({relations: ['meal']});
  }

  findIngredientById(reqUser: User, id: string): Promise<Ingredient> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return this.ingredientsRepository.findOne(id, {relations: ['meal']});
  }

  async createIngredient(reqUser: User, ingredient: Ingredient) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.ADMIN){
      return await this.ingredientsRepository.save(ingredient).catch(e => {
        if (e.code === '23505') {
          throw new ConflictException(`Ingredient ${ingredient.id} already exists.`);
        }
        throw e;
      });
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return await this.ingredientsRepository.save(ingredient).catch(e => {
      if (e.code === '23505') {
        throw new ConflictException(`Ingredient ${ingredient.id} already exists.`);
      }
      throw e;
    });
  }

  async updateIngredient(reqUser: User, ingredient: Ingredient) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return await this.ingredientsRepository.save(ingredient).catch(e => {
      throw e;
    });
  }

  async removeIngredient(reqUser: User, id: string): Promise<void> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    await this.ingredientsRepository.delete(id);
    return;
  }

  findAllSteps(reqUser: User): Promise<Step[]> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return this.stepsRepository.find({relations: ['meal']});
  }

  findStepById(reqUser: User, id: string): Promise<Step> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return this.stepsRepository.findOne(id, {relations: ['meal']});
  }

  async createStep(reqUser: User, step: Step) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.ADMIN){
      return await this.stepsRepository.save(step).catch(e => {
        if (e.code === '23505') {
          throw new ConflictException(`Step ${step.id} already exists.`);
        }
        throw e;
      });
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return await this.stepsRepository.save(step).catch(e => {
      if (e.code === '23505') {
        throw new ConflictException(`Step ${step.id} already exists.`);
      }
      throw e;
    });
  }

  async updateStep(reqUser: User, step: Step) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    return await this.stepsRepository.save(step).catch(e => {
      throw e;
    });
  }

  async removeStep(reqUser: User, id: string): Promise<void> {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }
    if(reqUser.group == UserGroup.USER){
      throw new ForbiddenException("Access denied. Admin rights required");
    }
    await this.stepsRepository.delete(id);
    return;
  }

}
