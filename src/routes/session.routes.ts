import { Router, Request, Response } from 'express';

import AuthUserService from '../services/AuthUserService';
import { areIntervalsOverlappingWithOptions } from 'date-fns/fp';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authUser = new AuthUserService();

    const { user, token } = await authUser.execute({
        email,
        password,
    })

    delete user.password;

    return response.json({ user, token });
});

export default sessionRouter;
