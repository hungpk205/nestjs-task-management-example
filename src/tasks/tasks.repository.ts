import { EntityRepository, Repository } from "typeorm";
import { GetTaskFilterDto } from "./dto/GetTaskFilter.dto";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
    async getAll(getTaskFilterDto: GetTaskFilterDto) {
        const { status, search } = getTaskFilterDto;

        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere("task.status = :status", { status })
        }
        if (search) {
            query.andWhere("LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)", { search: `%${search}%` })
        }
        const tasks = await query.getMany();
        return tasks;
    }
}
