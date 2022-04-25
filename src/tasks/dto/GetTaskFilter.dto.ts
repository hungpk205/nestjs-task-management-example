import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTaskFilterDto {

    @IsOptional()
    @IsString()
    search?: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}
