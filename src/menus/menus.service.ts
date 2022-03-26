import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { menuMaker } from 'src/libs/menuMaker';
import { Meal } from 'src/meals/entity/meal.entity';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { Menu } from './entity/menu.entity';

@Injectable()
export class MenusService {
  constructor(
      @InjectRepository(Menu)
      private menusRepository: Repository<Menu>,
      @InjectRepository(Meal)
      private mealsRepository: Repository<Meal>,
  ) {}

  async generate(reqUser: User) {
    if(!reqUser){
      throw new ForbiddenException("Access denied");
    }

    await menuMaker(this.menusRepository, this.mealsRepository)

  }

}
