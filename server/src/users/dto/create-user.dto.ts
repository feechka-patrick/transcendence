import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'user@mail.com', description: 'Email adress'})
    @IsString({message: "Should be a string"})
    @IsEmail({}, {message: "Incorrect email"})
    readonly email: string;

    @ApiProperty({example: '12345', description: 'Password'})
    @IsString({message: "Should be a string"})
    @Length(4, 16, {message: "At least 4 characters and no more than 16"})
    readonly password: string;
}