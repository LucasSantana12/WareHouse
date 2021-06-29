import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, matricula } = request.body;

    const createUser = container.resolve(CreateUserService);

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
