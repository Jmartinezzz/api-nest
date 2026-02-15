import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  findAll() {
    return this.users
  }

  getUserById(id: number) {
    const position = this.findOne(id)
    return this.users[position]
  }

  create(user: CreateUserDto) {
     const newUser = {
        ...user,
        id: new Date().getTime()
      }
      this.users.push(newUser)
      return newUser
  }

  update(id: number, user: UpdateUserDto) {
    const position = this.findOne(id)
    const currentUser = this.users[position]

    const updatedUser = {
      ...currentUser,
      ...user
    }
    this.users[position] = updatedUser
    return updatedUser
  }

  delete(id: number) {
    const position = this.findOne(id)
    this.users.splice(position, 1)
    return { message: 'User deleted successfully' }
  }

  private findOne(id: number) {
    const position = this.users.findIndex((user) => user.id == id)
    if (position === -1) {
      throw new NotFoundException('User not found')
    }
    return position
  }

}
