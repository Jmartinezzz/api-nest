import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

	constructor(
		@InjectRepository(User) private userRepository: Repository<User>
	) { }

	async findAll() {
		return await this.userRepository.find()
	}

	async getUserById(id: number) {
		const user = await this.findOne(id)
		return user
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
		const currentUser = await this.findOne(id)

		const updatedUser = this.userRepository.merge(currentUser, user)
		return this.userRepository.save(updatedUser)
	}

	async delete(id: number) {
		const user = await this.findOne(id)
		await this.userRepository.delete(user.id)
		return { message: 'User deleted successfully' }
	}

	private async findOne(id: number) {
		const user = await this.userRepository.findOneBy({ id })
		if (!user) {
			throw new NotFoundException('User not found')
		}
		return user
	}

}
