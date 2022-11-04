import { Model } from "sequelize-typescript";
import { User } from "src/users/users.model";
interface GameCreationAttrs {
    winner: boolean;
    time: number;
    userId: number;
}
export declare class Game extends Model<Game, GameCreationAttrs> {
    id: number;
    winner: boolean;
    time: number;
    userId: number;
    user: User;
}
export {};
