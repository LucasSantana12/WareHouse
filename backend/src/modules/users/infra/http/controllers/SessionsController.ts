import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Response, Request } from 'express';

import UsersRepository from '../../typeorm/repositories/UsersRepositories';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
    );

    const { user, token } = await authenticateUserService.execute({
      email,

      password,
    });

    return response.json({ user, token });
  }
}
