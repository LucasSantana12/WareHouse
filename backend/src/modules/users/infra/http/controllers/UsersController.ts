import CreateUserService from '@modules/users/services/CreateUserService';
import { Response, Request } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepositories';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, matricula } = request.body;

    const usersRepository = new UsersRepository();

    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({
      name,

      email,

      matricula,

      password,
    });

    delete user.password;

    return response.json(user);
  }
}
