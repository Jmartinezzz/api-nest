import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UnprocessableEntityException } from '@nestjs/common';

interface User {
	id: number;
	name: string;
	email: string;
}

@Controller('users')
export class UsersController {

	private users: User[] = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Doe', email: 'jane@example.com' },
	];

	@Get()
	getUsers() {
		return this.users
	}

	@Get(':id')
	findUSer(@Param('id') id: number) {
		const user =  this.users.find((user) => user.id == id	)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return user
	}

	@Post()
	createUser(@Body() body: User) {
		const newUser = {
			...body,
			id: new Date().getTime()
		}
		this.users.push(newUser)
		return newUser
	}

	@Put(':id')
	updateUser(@Param('id') id: number, @Body() body: User) {
		const position = this.users.findIndex((user) => user.id == id)
		if (position === -1) {
			throw new NotFoundException('User not found')
		}

		const currentUser = this.users[position]

		const email = body?.email
		if (email && !email.includes('@')) {
			throw new UnprocessableEntityException('Invalid email format')
		}

		const updatedUser = {
			...currentUser,
			...body
		}
		this.users[position] = updatedUser
		return updatedUser
	}

	@Delete(':id')
	deleteUser(@Param('id') id: number) {
		const position = this.users.findIndex((user) => user.id == id)
		if (position === -1) {
			throw new NotFoundException('User not found')
		}
		this.users.splice(position, 1)
		return { message: 'User deleted successfully' }
	}
}
