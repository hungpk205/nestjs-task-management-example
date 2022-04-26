import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsersDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    /**
     * Create user
     * @param createUsersDto 
     */
    async add(createUsersDto: CreateUsersDto) {
        const {username, password} = createUsersDto;
        const user = this.usersRepository.create({
            username, password
        });
        await this.usersRepository.save(user);
    }

    /**
     * Get all users
     * @returns Promise<User[]>
     */
    async getAll(): Promise<User[]> {
        const users = await this.usersRepository.find();
        return users;
    }
}
