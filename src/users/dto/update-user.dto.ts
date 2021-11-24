import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserGroup } from "../entity/user.entity";

export class UpdateUserDto {
  @ApiPropertyOptional({ enum: UserGroup, enumName: 'UserGroup' })
  @IsOptional()
  @IsEnum(UserGroup)
  group?: UserGroup;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;

}