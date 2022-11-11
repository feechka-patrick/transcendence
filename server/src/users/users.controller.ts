import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status:200, type: User })
    @Post()
    create(@Body() userDto: CreateUserDto){
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status:200, type: User })
    @Post('/deleteUser')
    deleteUser(@Body() userDto: CreateUserDto){
        return this.usersService.deleteUser(userDto);
    }

    @ApiOperation({ summary: 'Change email' })
    @ApiResponse({ status:200, type: User })
    @Post('/changeEmail')
    changeEmail(@Body() changeEmailDto: ChangeEmailDto){
        return this.usersService.changeEmail(changeEmailDto);
    }

    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status:200, type: [User] })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: 'Role assignment' })
    @ApiResponse({ status:200 })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.usersService.addRole(dto);
    }

    @ApiOperation({ summary: 'Ban user' })
    @ApiResponse({ status:200 })
    @Roles("admin")
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto){
        return this.usersService.ban(dto);
    }
}
