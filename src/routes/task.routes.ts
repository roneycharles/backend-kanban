import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateTaskService from '../services/CreateTaskService';
import constultAuthentication from '../middlewares/consultAuthentication';

const taskRouter = Router();

taskRouter.use(constultAuthentication)

taskRouter.post('/', async (request, response) => {
    const { title, user_id, description, type, delivery_date } = request.body;

    const parsedDate = parseISO(delivery_date);

    const createTask = new CreateTaskService();

    const task = await createTask.execute({
        title,
        user_id: request.user.id,
        description,
        type,
        delivery_date: parsedDate,
    });

    return response.json(task);
});

export default taskRouter;
