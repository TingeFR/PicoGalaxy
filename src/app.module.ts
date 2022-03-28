import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MealsModule } from './meals/meals.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign({
          type: 'postgres',
          host:
            process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost',
          port: 5432,
          username: 'postgres',
          password: '12345',
          database: 'picogalaxy',
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
        }),
    }),
    UsersModule,
    MealsModule,
    MenusModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
