import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Game } from './games.model';
import { User } from 'src/users/users.model';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
  imports: [
    SequelizeModule.forFeature([User, Game])
  ]
})
export class GamesModule {}
