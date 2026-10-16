import { Jwt } from '../lib/jwt.lib';
import { AppError } from '../errors/app.error';
import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req?.cookies;

  if (!cookies?.token) throw new AppError(401, 'Token must be provide');

  const payload = await Jwt.verify(cookies?.token, process.env.JWT_SECRET_KEY!);

  res.locals.payload = payload;

  next();
};

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { payload } = res.locals;
    
    if (!allowedRoles.includes(payload?.role))
      throw new AppError(401, 'Unauthorize user role');

    next();
  };
};
