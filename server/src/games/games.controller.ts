import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateGameDto } from './dto/create-game.dto';
import { GetGamesDto } from './dto/get-games.dto';
import { Game } from './games.model';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(private gameService: GamesService) {}

    @ApiOperation({ summary: 'Create game' })
    @ApiResponse({ status:200, type: Game })
    @Post()
    createGame(@Body() dto: CreateGameDto){
        return this.gameService.create(dto)
    }

    @ApiOperation({ summary: 'Get games by user' })
    @ApiResponse({ status:200, type: Game })
    @Post('/store')
    getGamesByUser(@Body() dto: GetGamesDto){
        return this.gameService.getGamesByUser(dto)
    }
}
