import { Router } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import IUserRepository from '@modules/users/infra/typeorm/repositories/UsersRepositories';

const usersRouter = Router();
usersRouter.post('/', async (request, response) => {
  const { name, email, password, matricula } = request.body;
  const usersRepository = new IUserRepository();
  console.log(request.body);

  const createUser = new CreateUserService(usersRepository);

  const user = await createUser.execute({
    name,

    email,

    matricula,

    password,
  });

  delete user.password;

  console.log(user);
  return response.json(user);
});

export default usersRouter;
