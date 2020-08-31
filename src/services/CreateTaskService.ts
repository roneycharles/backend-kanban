import { getCustomRepository } from 'typeorm';
import { isBefore, startOfDay } from 'date-fns';

import AppError from '../errors/AppError';
import Task from '../models/Task';
import TaskRepository from '../repositories/TaskRepository';
import User from 'models/User';

interface Request {
    title: string;
    user_id: string;
    description: string;
    type: string;
    delivery_date: Date;
}

class CreateTaskService {
    public async execute({title, user_id, description, type, delivery_date}: Request): Promise<Task> {
        const taskRepository = getCustomRepository(TaskRepository);

        const taskDate = startOfDay(delivery_date);

        var date = new Date();

        const findDateByPast = isBefore(date, delivery_date)

        if (findDateByPast) {
            throw new AppError('Data não pode ser anterior à data atual');
        }

        const task = taskRepository.create({
            title,
            user_id,
            description,
            type,
            delivery_date: taskDate
        });

        await taskRepository.save(task);

        return task;

    }
}

export default CreateTaskService;
