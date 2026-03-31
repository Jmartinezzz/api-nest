import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { log } from 'console';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) { }

	async findAll() {
		return await this.userRepository.find({
			relations: ['profile']
		})
	}

	async getUserById(id: number) {
		const user = await this.findOne(id)
		return user
	}

	async getProfileByUserId(id: number) {
		const user = await this.findOne(id)
		return user.profile
	}

	async create(user: CreateUserDto) {
		try {
			const newUser = await this.userRepository.save(user)
			return newUser
		} catch (error) {
			throw new BadRequestException("Error creating user")
		}
	}

	async update(id: number, user: UpdateUserDto) {
		try {
			const currentUser = await this.findOne(id)
			const updatedUser = this.userRepository.merge(currentUser, user)
			const savedUser = await this.userRepository.save(updatedUser)
			return savedUser
		} catch (error) {
			throw new BadRequestException("Error updating user")
		}
	}

	async delete(id: number) {
		try {
			await this.userRepository.delete(id)
			return { message: 'User deleted successfully' }
		} catch {
			throw new BadRequestException("Error deleting user")
		}
	}

	private async findOne(id: number) {
		const user = await this.userRepository.findOne({
			where: { id },
			relations: ['profile']
		})
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return user
	}

}
