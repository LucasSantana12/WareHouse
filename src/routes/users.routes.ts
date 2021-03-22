import { Router } from 'express';
import { parseISO } from 'date-fns'

import UserRepository from '../repositories/UsersRepository';
import CreateUserService from '../services/CreateUserService';
import { getCustomRepository } from 'typeorm';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getCustomRepository(UserRepository)
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name,email,password,matricula } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,email,password,matricula
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
