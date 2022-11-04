import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from 'src/auth/auth.service';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {

	constructor(@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService) { }

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleValue("admin")
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user;
	}

	async changeEmail(dto: ChangeEmailDto) {
		//check new_email
		const candidate = await this.getUserByEmail(dto.new_email);
		if (candidate)
			throw new HttpException("User with this email exists", HttpStatus.BAD_REQUEST);

		const user = await this.getUserByEmail(dto.email);
		if (user) {
			const passwordEquals = await bcrypt.compare(dto.password, user.password);
			if (passwordEquals) {
				await this.userRepository.update({ email: dto.new_email }, { where: { id: user.id } })
				return user;
			}
			throw new UnauthorizedException({ message: 'Incorrect password' });
		}
		throw new HttpException("User not found", HttpStatus.NOT_FOUND);
	}

	async deleteUser(dto: CreateUserDto) {
		const user = await this.getUserByEmail(dto.email);
		if (user) {
			const passwordEquals = await bcrypt.compare(dto.password, user.password);
			if (passwordEquals) {
				await this.userRepository.destroy({ where: { id: user.id } })
				return "success";
			}
			throw new UnauthorizedException({ message: 'Incorrect password' });
		}
		throw new HttpException("User not found", HttpStatus.NOT_FOUND);
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } })
		return user;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userid);
		const role = await this.roleService.getRoleValue(dto.value);

		if (role && user) {
			await user.$add('role', role.id);
			return dto;
		}
		throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		if (!user) {
			throw new HttpException('User not found', HttpStatus.NOT_FOUND);
		}
		user.banned = true;
		user.banReason = dto.banReason;
		await user.save();
		return user;
	}
}
