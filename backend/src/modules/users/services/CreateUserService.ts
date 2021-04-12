import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../entities/User';
import AppError from '../../../shared/error/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  matricula: number;
  admin?: boolean;
}
class UserRepository {
  public async execute({
    name,
    email,
    password,
    matricula,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmail = await usersRepository.findOne({
      where: { email },
    });
    if (checkEmail) {
      throw new AppError('Opa, esse email já existe');
    }

    const hashedPassword = await hash(password, 8);

    if (email === 'admin@admin.fucapi') {
      const user = usersRepository.create({
        name,
        email,
        password: hashedPassword,
        matricula,
        admin: true,
      });

      await usersRepository.save(user);

      return user;
    }

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      matricula,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default UserRepository;
