"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("../users/users.model");
const games_model_1 = require("./games.model");
let GamesService = class GamesService {
    constructor(gameRepository, userRepository) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const game = await this.gameRepository.create(dto);
        return game;
    }
    async getGamesByUser(dto) {
        const user = await this.userRepository.findOne({ where: { email: dto.userEmail } });
        if (user) {
            const games = await this.gameRepository.findAll({ where: { userId: user.id } });
            return games;
        }
        throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
    }
};
GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(games_model_1.Game)),
    __param(1, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object, Object])
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map