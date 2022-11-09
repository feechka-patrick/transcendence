import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate{

    constructor(private jwtService: JwtService,
        private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiaredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiaredRoles) {
                return true;
            }
            const request = context.switchToHttp().getRequest()
            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({ message: "User not authorizated" })
            }

            const user = this.jwtService.verify(token);
            request.user = user;

            return user.roles.some(role => requiaredRoles.includes(role.value));
        } catch (e){
            throw new HttpException("Access denied", HttpStatus.FORBIDDEN)
        }
    }
}