import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { objectInspect } from 'src/libs/utils';
import { Meal, MonthsOfYear } from 'src/meals/entity/meal.entity';
import { User } from 'src/users/entity/user.entity';
import { getRepository, Repository } from 'typeorm';
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

  // ---- PREPARATIFS ----
    const menus = await this.menusRepository.find({ relations: ["meals"] });
    const meals = await this.mealsRepository.find()

  //---- CALCUL DES SCORES ----
    const scorers: Array<{meal: Meal, score: number}> = []

    // Initialisation à zéro
    meals.forEach((meal, index) => {
      scorers[index] = { meal: meal, score: 0 }
    })

    // Etape 1 : La saisonnalité
    const currentMonth = (new Date().getMonth() + 1).toString() as MonthsOfYear
    scorers.forEach(scorer => {
      if(scorer.meal.seasonMonths.length == 0 || scorer.meal.seasonMonths.includes(currentMonth)){
        scorer.score += 20
      }
    })

    // Etape 2 : Les amoureux
    scorers.forEach(scorer => {
      if(scorer.meal.kennyLoves && scorer.meal.quentinLoves){
        scorer.score += 30
      }
      else if(scorer.meal.kennyLoves || scorer.meal.quentinLoves){
        scorer.score += 10
      }
    })

    // Etape 3 : La non-répétitivité
    scorers.forEach(scorer => {
      menus.forEach(menu => {
        if(menu.meals.some(meal => meal.id === scorer.meal.id)){
          scorer.score -= 50
        }
      })
    })

    // Dernière étape : Tri descendant et composition
    const sortedScorers = scorers.sort((s1,s2) => s2.score - s1.score)
    const numberOfMeals = scorers.length < 7 ? scorers.length : 7
    const newMeals: Meal[] = []
    const newMenu = new Menu()

    for (let i = 0; i < numberOfMeals; i++) {
      newMeals.push(sortedScorers[i].meal)
    }

    newMenu.meals = newMeals
    await this.menusRepository.save(newMenu)

  }

}
