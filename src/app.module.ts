import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sebas:sebas@mycluster0.ruqvpdh.mongodb.net/'),
    UsersModule,
    AuthModule,
    CharactersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
