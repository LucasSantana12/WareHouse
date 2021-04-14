import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import IUserRepository from '../repositories/IUsersRepositories';

interface Request {
  name: string;
  email: string;
  password: string;
  matricula: number;
  admin?: boolean;
}
class UserRepository {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({
    name,
    email,
    password,
    matricula,
  }: Request): Promise<User> {
    const checkEmail = await this.usersRepository.findByEmail(email);
    if (checkEmail) {
      throw new AppError('Opa, esse email já existe');
    }

    const hashedPassword = await hash(password, 8);

    if (email === 'admin@admin.fucapi') {
      const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
        matricula,
        admin: true,
      });

      return user;
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      matricula,
    });

    return user;
  }
}

export default UserRepository;
