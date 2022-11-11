import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';
import jwtDecode from 'jwt-decode';
import { TokenDto } from 'src/users/dto/token.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException("User with this email exists", HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({ ...userDto, password: hashPassword });
        return this.generateToken(user);
    }

    async decodeToken(signedJwtAccessToken: TokenDto) {
        const decodedJwtAccessToken = jwtDecode(signedJwtAccessToken.token);
        return decodedJwtAccessToken;
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles, password: user.password };
        return this.jwtService.sign(payload)
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (user) {
            const passwordEquals = await bcrypt.compare(userDto.password, user.password);
            if (passwordEquals) {
                return user;
            }
            throw new UnauthorizedException({ message: 'Incorrect password' });
        }
        throw new UnauthorizedException({ message: 'User with this email not exists' });
    }
}
