import { Controller, Get, Logger, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { GetMealsDto } from './dto/get-meals.dto';
import { MealMapper } from './dto/meal.mapper';
import { MealsService } from './meals.service';

@ApiTags('meals')
@Controller('meals')
export class MealsController {

  private readonly logger: Logger;

  constructor(
    private readonly mealsService: MealsService,
    private readonly mealMapper: MealMapper,
  ) {
    this.logger = new Logger(MealsController.name);
  }

  // GET /meals
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List meals' })
  @ApiOkResponse({
    description: 'Meal list',
    type: GetMealsDto,
  })
  async findAll(
    @Req() r,
    @Query() q
  ): Promise<GetMealsDto> {
    const meals = await this.mealsService.findAll(r.user);
    return { meals }
  }

}
