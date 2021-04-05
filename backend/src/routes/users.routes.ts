import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, matricula } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,

    email,

    matricula,

    password,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
