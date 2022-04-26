import { Body, Controller, Get, Post } from '@nestjs/common';
import { create } from 'domain';
import { CreateUsersDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    /**
     * Create user dto
     * @param createUsersDto
     */
    @Post()
    add(@Body() createUsersDto: CreateUsersDto) {
        this.usersService.add(createUsersDto)
    }

    @Get()
    getAll(): Promise<User[]> {
        return this.usersService.getAll();
    }
}
