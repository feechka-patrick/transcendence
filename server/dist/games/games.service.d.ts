import { User } from 'src/users/users.model';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesDto } from './dto/get-games.dto';
import { Game } from './games.model';
export declare class GamesService {
    private gameRepository;
    private userRepository;
    constructor(gameRepository: typeof Game, userRepository: typeof User);
    create(dto: CreateGameDto): Promise<Game>;
    getGamesByUser(dto: GetGamesDto): Promise<Game[]>;
}
