import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { GetTaskFilterDto } from './dto/GetTaskFilter.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksRepository)
        private tasksRepository: TasksRepository
    ) {}
    
    //Get tasks
    async getTasks(getTaskFilter: GetTaskFilterDto): Promise<Task[]> {
        const tasks = await this.tasksRepository.getAll(getTaskFilter);
        return tasks;
    }

    /**
     * Find by id
     * @param id string
     * @returns task Task
     */
    async getById(id: string): Promise<Task> {
        const task = await this.tasksRepository.findOne({id: id});
        return task;
    }

    //Create task
    async add(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task = this.tasksRepository.create({
            title, description, status: TaskStatus.OPEN
        });
        await this.tasksRepository.save(task);
        console.log('task', task);
    }

    /**
     * Delete by id
     * @param id string
     */
    async deleteById(id: string) {
        const task = await this.tasksRepository.findOne(id);
        if (task) {
            this.tasksRepository.remove(task);
        }
    }

    /**
     * Update status of task
     * @param id string
     * @param taskStatus TaskStatus
     * @returns Task
     */
    async updateStatus(id: string, taskStatus: TaskStatus): Promise<Task> {
        const task = await this.tasksRepository.findOne(id);
        if (task) {
            task.status = taskStatus;
            this.tasksRepository.save(task);
        }
        return task;
    }
}
