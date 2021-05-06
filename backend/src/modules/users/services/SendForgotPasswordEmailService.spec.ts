import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/error/AppError';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('createUser', () => {
  it('shoud be able to recover the user password with email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      matricula: 123456,
      password: '123456',
      admin: true,
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@exemple.com',
    });

    await expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able recover a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'batuttas@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
