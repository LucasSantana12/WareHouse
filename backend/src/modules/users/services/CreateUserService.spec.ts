import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import CreateUserService from './CreateUserService';

describe('createUser', () => {
  it('shoud be able to create a new loan', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const createUser = new CreateUserService(fakeUsersRepository);

    const user = await createUser.execute({
      name: 'Lucas Santana',
      email: 'batuttas@gmail.com',
      matricula: 1919,
      password: 'lucas',
      admin: false,
    });

    expect(user).toHaveProperty('id');
  });
});
