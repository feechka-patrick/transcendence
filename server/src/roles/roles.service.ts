import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto){
        const role = this.getRoleValue(dto.value);
        if (role)
        {
            throw new HttpException("This role already exists", HttpStatus.BAD_REQUEST);
        }
        const newrole = await this.roleRepository.create(dto);
        return newrole;
    }

    async getRoleValue(value: string){
        const role = await this.roleRepository.findOne({where: {value}})
        return role;
    }
}
