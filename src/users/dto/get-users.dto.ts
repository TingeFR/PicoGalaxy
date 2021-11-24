import { ApiResponseProperty } from "@nestjs/swagger";
import { User } from "../entity/user.entity";

export class GetUsersDto {
  @ApiResponseProperty({ type: [User] })
  users: User[];
}