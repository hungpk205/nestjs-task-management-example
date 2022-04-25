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
    

    private tasks: Task[] = [];

    //Get tasks
    getTasks(getTaskFilter: GetTaskFilterDto): Task[] {
        const {search, status} = getTaskFilter;

        let tasks = this.tasks;

        if (status) {
            tasks = tasks.filter((task) => task.status === status);
        }

        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.includes(search)) {
                    return true;
                }
                if (task.description.includes(search)) {
                    return true;
                }
            })
        }
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
    deleteById(id: string) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    /**
     * Update status of task
     * @param id string
     * @param taskStatus TaskStatus
     * @returns Task
     */
    updateStatus(id: string, taskStatus: TaskStatus): Task {
        var task = this.tasks.find((task) => task.id === id);
        task.status = taskStatus;
        return task;

    }
}
