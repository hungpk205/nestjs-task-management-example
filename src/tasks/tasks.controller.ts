import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/CreateTask.dto';
import { GetTaskFilterDto } from './dto/GetTaskFilter.dto';
import { UpdateTaskStatus } from './dto/UpdateTaskStatus.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    //Get tasks
    @Get()
    getTasks(@Query() getTaskFilter: GetTaskFilterDto): Task[] {
        return this.taskService.getTasks(getTaskFilter);
    }

    /**
     * Get by id
     * @param id string 
     * @returns Task
     */
    @Get("/:id")
    getById(@Param("id") id: string): Promise<Task> {
        return this.taskService.getById(id);
    }

    //Add tasks
    @Post()
    addTasks(@Body() body: CreateTaskDto) {
        console.log('body', body);
        this.taskService.add(body);
    }

    /**
     * Delete by id
     * @param id string
     */
    @Delete(":id")
    deleteById(@Param("id") id: string) {
        this.taskService.deleteById(id);
    }

    /**
     * Update status of task
     * @param id string
     * @param request UpdateTaskStatus
     * @returns Task
     */
    @Patch(":id")
    updateStatus(@Param("id") id: string, @Body() request: UpdateTaskStatus): Task {
        return this.taskService.updateStatus(id, request.status);
    }

}
