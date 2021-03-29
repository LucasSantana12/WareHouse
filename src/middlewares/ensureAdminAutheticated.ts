import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import authConfig from '../config/auth';
import User from '../models/User';

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
    throw new Error('JWT Token is missing!!');
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
    console.log(getAdmin);

    if (!getAdmin as boolean) {
      response.sendStatus(401);
    }

    console.log(decoded);
    return next();
  } catch {
    throw new Error('Invalid JWT Token');
  }
}
