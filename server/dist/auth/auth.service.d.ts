import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { TokenDto } from 'src/users/dto/token.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(userDto: CreateUserDto): Promise<string>;
    registration(userDto: CreateUserDto): Promise<string>;
    decodeToken(signedJwtAccessToken: TokenDto): Promise<unknown>;
    private generateToken;
    private validateUser;
}
