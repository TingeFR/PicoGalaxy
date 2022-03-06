import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put, Query, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { MenusService } from './menus.service';

@ApiTags('menus')
@Controller('menus')
export class MenusController {

  private readonly logger: Logger;

  constructor(
    private readonly menusService: MenusService,
  ) {
    this.logger = new Logger(MenusController.name);
  }

  //POST /menus
  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generates a menu' })
  async generate(
    @Req() r,
    @Query() q
  ): Promise<string> {
    const phrase = await this.menusService.generate(r.user);
    return "Miam ! Miam ! Miam ! Tout a été envoyé par mail mes petits poulets !"
  }

}
