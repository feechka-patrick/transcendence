import { IsString } from "class-validator";

export class CreateRoleDto {
    @IsString({ message: "Should be a string" })
    readonly value: string;
    @IsString({ message: "Should be a string" })
    readonly description: string;
}