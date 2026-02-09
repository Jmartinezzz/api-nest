import { Controller, Get, Param } from '@nestjs/common';

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
		return this.users.find((user) => user.id == id	)
	}
}
