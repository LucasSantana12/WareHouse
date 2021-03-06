import { compare } from 'bcryptjs';

import { sign } from 'jsonwebtoken';

import User from '@modules/users/infra/typeorm/entities/User';

import authConfig from '@config/auth';

import AppError from '@shared/error/AppError';

import UsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;

  password: string;
}

interface IResponse {
  user: User;

  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email/Senha incorreto', 401);
    }

    /**

     * user.password - Senha criptografada;

     * password - senha nao criptografada;

     */

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Email/Senha incorreto', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,

      expiresIn,
    });

    return {
      user,

      token,
    };
  }
}

export default AuthenticateUserService;
