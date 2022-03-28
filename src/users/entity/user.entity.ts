export enum UserGroup {
  USER = 'user',
  ADMIN = 'admin',
}

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ enum: UserGroup, enumName: 'UserGroup' })
  @Column({
    type: 'enum',
    enum: UserGroup,
    default: UserGroup.USER,
  })
  group: UserGroup;

  @ApiProperty()
  @Index({ unique: true })
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  hashedPassword: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column({ default: true })
  isActive?: boolean;
}
