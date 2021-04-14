import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '@config/auth';
import AppError from '@shared/error/AppError';
import User from '@modules/users/infra/typeorm/entities/User';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function ensureAdminAutheticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authMethod = request.headers.authorization;
  const userRepository = getRepository(User);

  if (!authMethod) {
    throw new AppError('JWT Token is missing!!', 401);
  }

  /**
   * como fazer uma divisão de uma string
   *
   * a string do token esta da senguinte maneira
   * Barear tokens
   * so vou usar a segunda parte
   */

  const [, token] = authMethod.split(' ');
  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };
    const getCurrentUser = await userRepository.findOne({
      where: {
        id: sub,
      },
    });

    const getAdmin = getCurrentUser?.admin;

    if (!getAdmin as boolean) {
      response.sendStatus(401);
    }

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
