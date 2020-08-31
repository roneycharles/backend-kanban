import { EntityRepository, Repository } from 'typeorm';

import Task from '../models/Task';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
    public async findByDate(date: Date): Promise<Task | null> {
        const findTask = await this.findOne({
            where: { date },
        })

        return findTask || null;
    }
}

export default TaskRepository;
