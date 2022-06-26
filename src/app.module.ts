import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationMiddleware } from './authentication.middleware';
import { DatabaseModule } from './database/database.module';
import { UsersController } from './users/users.controller';
import { FilesController } from './files/files.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { usersProviders } from './users/users.providers';
import { FilesService } from './files/files.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule
  ],
  controllers: [
    AppController, 
    UsersController, 
    FilesController
  ],
  providers: [AppService, UsersService, ...usersProviders, FilesService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware)
    .forRoutes(AppController, UsersController, FilesController);
  }
}
