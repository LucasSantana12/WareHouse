import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAutheticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authMethod = request.headers.authorization;

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

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT Token');
  }
}
