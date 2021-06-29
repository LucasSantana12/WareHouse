import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    // show users profile
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, matricula, old_password } = request.body;
    const user_id = request.user.id;
    const updateProfile = container.resolve(UpdateProfileService);

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      matricula,
      old_password,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
