import { injectable, inject } from 'tsyringe';

import IMailProvider from '@shared/container/MailProvider/models/IMailProvider';
import AppError from '@shared/error/AppError';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUser = await this.usersRepository.findByEmail(email);

    if (!checkUser) {
      throw new AppError('The user does not exists.');
    }
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}
export default SendForgotPasswordEmailService;
