import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/users.model";

interface GameCreationAttrs{
    winner: boolean;
    time: number;
    userId: number;
}

@Table({ tableName: 'games' })
export class Game extends Model<Game, GameCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Unique identificator' })
    @Column({ type: DataType.INTEGER, unique:true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({ example: 'false', description: 'User is winner or nor' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    winner: boolean;

    @ApiProperty({ example: '30', description: 'Game time (seconds)' })
    @Column({ type: DataType.INTEGER, allowNull:false })
    time: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    user: User;
}
