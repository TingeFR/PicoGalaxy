import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { CreateMealDto } from './dto/create-meal.dto';
import { GetMealsDto } from './dto/get-meals.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealsService } from './meals.service';
import { MealCreator } from './dto/meal.creator';
import { MealUpdater } from './dto/meal.updater';
import { Meal } from './entity/meal.entity';
import { GetIngredientsDto } from './dto/get-ingredients.dto';
import { Ingredient } from './entity/ingredient.entity';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientCreator } from './dto/ingredient.creator';
import { IngredientUpdater } from './dto/ingredient.updater';
import { StepCreator } from './dto/step.creator';
import { StepUpdater } from './dto/step.updater';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { GetStepsDto } from './dto/get-steps.dto';
import { Step } from './entity/step.entity';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@ApiTags('meals')
@Controller('meals')
export class MealsController {
  private readonly logger: Logger;

  constructor(
    private readonly mealsService: MealsService,
    private readonly mealCreator: MealCreator,
    private readonly mealUpdater: MealUpdater,
    private readonly ingredientCreator: IngredientCreator,
    private readonly ingredientUpdater: IngredientUpdater,
    private readonly stepCreator: StepCreator,
    private readonly stepUpdater: StepUpdater,
  ) {
    this.logger = new Logger(MealsController.name);
  }

  //GET /meals
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List meals' })
  @ApiOkResponse({
    description: 'Meal list',
    type: GetMealsDto,
  })
  async findAll(@Req() r, @Query() q): Promise<GetMealsDto> {
    const meals = await this.mealsService.findAll(r.user);
    return { meals };
  }

  //GET /meals/{id}
  @Get('/id/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Meal',
    type: Meal,
  })
  @ApiNotFoundResponse({ description: 'Meal not found' })
  @ApiOperation({ summary: 'Get one meal with its id' })
  async findById(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ): Promise<Meal> {
    const meal = await this.mealsService.findById(r.user, id);
    if (meal) {
      return meal;
    }
    Logger.error(`Unknown meal id: ${id}`);
    throw new NotFoundException('Meal not found');
  }

  //POST /meals
  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create a new meal' })
  @ApiConflictResponse({ description: 'Meal already exists' })
  @ApiOperation({ summary: 'Create a new meal' })
  async create(
    @Req() r,
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    meal: CreateMealDto,
  ) {
    const newMeal = await this.mealCreator.map(r.user, meal);
    return this.mealsService.create(r.user, newMeal);
  }

  //PUT /meals/{id}
  @Put('/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update a meal' })
  @ApiNotFoundResponse({ description: 'Meal not found' })
  @ApiOperation({ summary: 'Update a meal' })
  async update(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    meal: UpdateMealDto,
  ) {
    const updatedMeal = await this.mealUpdater.map(r.user, id, meal);
    return this.mealsService.update(r.user, updatedMeal);
  }

  //DELETE /meals/{id}
  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove meal' })
  async remove(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ) {
    const meal = await this.mealsService.findById(r.user, id);
    if (meal) {
      return await this.mealsService.remove(r.user, id);
    }
    Logger.error(`Unknown meal id: ${id}`);
    throw new NotFoundException('Meal not found');
  }

  //GET /meals/ingredients
  @Get('ingredients')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List ingredients' })
  @ApiOkResponse({
    description: 'Ingredient list',
    type: GetIngredientsDto,
  })
  async findAllIngredients(@Req() r, @Query() q): Promise<GetIngredientsDto> {
    const ingredients = await this.mealsService.findAllIngredients(r.user);
    return { ingredients };
  }

  //GET /meals/ingredients/id/{id}
  @Get('ingredients/id/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Ingredient',
    type: Ingredient,
  })
  @ApiNotFoundResponse({ description: 'Ingredient not found' })
  @ApiOperation({ summary: 'Get one ingredient with its id' })
  async findIngredientById(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ): Promise<Ingredient> {
    const ingredient = await this.mealsService.findIngredientById(r.user, id);
    if (ingredient) {
      return ingredient;
    }
    Logger.error(`Unknown ingredient id: ${id}`);
    throw new NotFoundException('Ingredient not found');
  }

  //POST /meals/ingredients
  @Post('ingredients')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create a new ingredient' })
  @ApiConflictResponse({ description: 'Ingredient already exists' })
  @ApiOperation({ summary: 'Create a new ingredient' })
  async createIngredient(
    @Req() r,
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    ingredient: CreateIngredientDto,
  ) {
    const newIngredient = await this.ingredientCreator.map(r.user, ingredient);
    return this.mealsService.createIngredient(r.user, newIngredient);
  }

  //PUT /meals/ingredients/{id}
  @Put('ingredients/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update a ingredient' })
  @ApiNotFoundResponse({ description: 'Ingredient not found' })
  @ApiOperation({ summary: 'Update a ingredient' })
  async updateIngredient(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    ingredient: UpdateIngredientDto,
  ) {
    const updatedIngredient = await this.ingredientUpdater.map(
      r.user,
      id,
      ingredient,
    );
    return this.mealsService.updateIngredient(r.user, updatedIngredient);
  }

  //DELETE /ingredients/{id}
  @Delete('ingredients/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove ingredient' })
  async removeIngredient(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ) {
    const ingredient = await this.mealsService.findIngredientById(r.user, id);
    if (ingredient) {
      return await this.mealsService.removeIngredient(r.user, id);
    }
    Logger.error(`Unknown ingredient id: ${id}`);
    throw new NotFoundException('Ingredient not found');
  }

  //GET /meals/steps
  @Get('steps')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List steps' })
  @ApiOkResponse({
    description: 'Step list',
    type: GetStepsDto,
  })
  async findAllSteps(@Req() r, @Query() q): Promise<GetStepsDto> {
    const steps = await this.mealsService.findAllSteps(r.user);
    return { steps };
  }

  //GET /meals/steps/id/{id}
  @Get('steps/id/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Step',
    type: Step,
  })
  @ApiNotFoundResponse({ description: 'Step not found' })
  @ApiOperation({ summary: 'Get one step with its id' })
  async findStepById(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ): Promise<Step> {
    const step = await this.mealsService.findStepById(r.user, id);
    if (step) {
      return step;
    }
    Logger.error(`Unknown step id: ${id}`);
    throw new NotFoundException('Step not found');
  }

  //POST /meals/steps
  @Post('steps')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Create a new step' })
  @ApiConflictResponse({ description: 'Step already exists' })
  @ApiOperation({ summary: 'Create a new step' })
  async createStep(
    @Req() r,
    @Body(
      new ValidationPipe({
        transform: true,
      }),
    )
    step: CreateStepDto,
  ) {
    const newStep = await this.stepCreator.map(r.user, step);
    return this.mealsService.createStep(r.user, newStep);
  }

  //PUT /meals/steps/{id}
  @Put('steps/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Update a step' })
  @ApiNotFoundResponse({ description: 'Step not found' })
  @ApiOperation({ summary: 'Update a step' })
  async updateStep(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    step: UpdateStepDto,
  ) {
    const updatedStep = await this.stepUpdater.map(r.user, id, step);
    return this.mealsService.updateStep(r.user, updatedStep);
  }

  //DELETE /steps/{id}
  @Delete('steps/:id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove step' })
  async removeStep(
    @Req() r,
    @Param(
      'id',
      new ValidationPipe({
        transform: true,
      }),
    )
    id: string,
  ) {
    const step = await this.mealsService.findStepById(r.user, id);
    if (step) {
      return await this.mealsService.removeStep(r.user, id);
    }
    Logger.error(`Unknown step id: ${id}`);
    throw new NotFoundException('Step not found');
  }
}
