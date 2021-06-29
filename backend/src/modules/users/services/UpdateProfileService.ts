import AppError from '@shared/error/AppError';

import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;

  name: string;

  email: string;

  matricula?: string;

  old_password?: string;

  password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    name,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user_id) {
      throw new AppError('this email already exists.');
    }

    user.name = name;

    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to tell us your old password to update for a new one',
      );
    }

    if (password && old_password) {
      const checkOldpPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldpPassword) {
        throw new AppError(
          'Wow! Your old password seems to be worng, try again',
        );
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfile;
