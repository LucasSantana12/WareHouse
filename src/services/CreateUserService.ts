import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UserRepository from '../repositories/UsersRepository';

interface Request {
  name: string,
  email: string,
  password: string;
  matricula: number

}

class CreateUserService {
  public async execute({ name, email, password, matricula }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository)

    const user = usersRepository.create({

      name,
      email,
      password,
      matricula
    });

    await usersRepository.save(user)

    return user;
  }
}

export default CreateUserService;
