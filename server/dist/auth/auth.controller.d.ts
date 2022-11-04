import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { TokenDto } from 'src/users/dto/token.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(userDto: CreateUserDto): Promise<string>;
    registration(userDto: CreateUserDto): Promise<string>;
    decodeToken(token: TokenDto): Promise<unknown>;
}
