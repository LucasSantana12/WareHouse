import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepositories';
import UserTokensRepository from '../../typeorm/repositories/UserTokensRepository';

export default class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const user = new UsersRepository();
    const mail = new EtherealMailProvider();
    const userTokens = new UserTokensRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      user,
      mail,
      userTokens,
    );

    await sendForgotPasswordEmail.execute({ email });

    return res.status(204).json();
  }
}
