import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesDto } from './dto/get-games.dto';
import { Game } from './games.model';

@Injectable()
export class GamesService {
    constructor(@InjectModel(Game) private gameRepository: typeof Game,
            @InjectModel(User) private userRepository: typeof User) {}

    async create(dto: CreateGameDto) {
       const game = await this.gameRepository.create(dto)
       return game;
    }

    async getGamesByUser(dto: GetGamesDto) {
        const user = await this.userRepository.findOne({ where: { email: dto.userEmail } })

        if (user){
            const games = await this.gameRepository.findAll({ where: { userId : user.id } })
            return games;
        }
        throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
}
