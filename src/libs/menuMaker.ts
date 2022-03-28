import { Meal, MonthsOfYear } from 'src/meals/entity/meal.entity';
import { Menu } from 'src/menus/entity/menu.entity';
import { Repository } from 'typeorm';
import { sendEmail } from './emailSender';
import {
  updateNotionDate,
  updateNotionRows,
  updateNotionToDos,
} from './notionUpdater';

export const menuMaker = async (
  menusRepository: Repository<Menu>,
  mealsRepository: Repository<Meal>,
) => {
  // ---- PREPARATIFS ----

  const menus = await menusRepository.find({ relations: ['meals'] });
  const meals = await mealsRepository.find({
    relations: ['ingredients', 'steps'],
  });
  const scorers: Array<{ meal: Meal; score: number }> = [];

  //---- CALCUL DES SCORES ----

  // Initialisation à zéro
  meals.forEach((meal, index) => {
    scorers[index] = { meal: meal, score: 0 };
  });

  // Etape 1 : La saisonnalité
  const currentMonth = (new Date().getMonth() + 1).toString() as MonthsOfYear;
  scorers.forEach((scorer) => {
    if (
      scorer.meal.seasonMonths.length == 0 ||
      scorer.meal.seasonMonths.includes(currentMonth)
    ) {
      scorer.score += 20;
    }
  });

  // Etape 2 : Les amoureux
  scorers.forEach((scorer) => {
    if (scorer.meal.kennyLoves && scorer.meal.quentinLoves) {
      scorer.score += 30;
    } else if (scorer.meal.kennyLoves || scorer.meal.quentinLoves) {
      scorer.score += 10;
    }
  });

  // Etape 3 : La non-répétitivité
  scorers.forEach((scorer) => {
    menus.forEach((menu) => {
      if (menu.meals.some((meal) => meal.id === scorer.meal.id)) {
        scorer.score -= 50;
      }
    });
  });

  // Dernière étape : Tri descendant et composition
  const sortedScorers = scorers.sort((s1, s2) => s2.score - s1.score);
  const numberOfMeals = scorers.length < 7 ? scorers.length : 7;
  const newMeals: Meal[] = [];
  const newMenu = new Menu();

  for (let i = 0; i < numberOfMeals; i++) {
    newMeals.push(sortedScorers[i].meal);
  }

  newMenu.meals = newMeals;
  await menusRepository.save(newMenu);

  // Bonus : Mise en forme et envoi Mail + Notion API
  const recettes = newMeals.map((meal) => meal.name);
  const courses: string[] = [];

  const coursesList: { quantity: number; unit: string; name: string }[] = [];
  newMeals.forEach((meal) => {
    meal.ingredients.forEach((ingredient) => {
      const index = coursesList.findIndex(
        (item) => item.name === ingredient.name,
      );
      if (index != -1) {
        coursesList[index].quantity += ingredient.quantity;
      } else {
        const { quantity, unit, name } = ingredient;
        coursesList.push({ quantity: quantity, unit: unit, name: name });
      }
    });
  });

  coursesList.forEach((c) => {
    courses.push(`${c.quantity} ${c.unit} de ${c.name}`);
  });

  const ts = new Date();
  await updateNotionDate(ts);
  await updateNotionRows(recettes);
  await updateNotionToDos(courses);
  sendEmail(recettes, courses, ts);
};
