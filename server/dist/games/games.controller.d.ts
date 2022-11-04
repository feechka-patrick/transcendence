import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesDto } from './dto/get-games.dto';
import { Game } from './games.model';
import { GamesService } from './games.service';
export declare class GamesController {
    private gameService;
    constructor(gameService: GamesService);
    createGame(dto: CreateGameDto): Promise<Game>;
    getGamesByUser(dto: GetGamesDto): Promise<Game[]>;
}
