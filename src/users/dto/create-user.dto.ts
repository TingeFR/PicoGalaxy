import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { UserGroup } from "../entity/user.entity";

export class CreateUserDto {
  @ApiPropertyOptional({ enum: UserGroup, enumName: 'UserGroup' })
  @IsOptional()
  @IsEnum(UserGroup)
  group?: UserGroup;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsOptional()
  isActive?: boolean;

}