import IUserRepository from '@modules/users/repositories/IUsersRepository';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUserRepository {
  private Users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.Users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.Users.find(user => user.email === email);

    return findUser;
  }

  public async create({
    name,
    email,
    matricula,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      matricula,
    });
    this.Users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.Users.findIndex(findUser => findUser.id === user.id);

    this.Users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
