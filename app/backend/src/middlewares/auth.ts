import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IRequest } from '../interfaces';
import HttpValidateError from '../errors/validation.erros';

const SECRET = process.env.JWT_SECRET || 'secret';

const tokenValidation = (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new HttpValidateError(401, 'Token not found');
  }
  try {
    const payload = jwt.verify(authorization, SECRET);
    req.email = payload;
    next();
  } catch (error) {
    throw new HttpValidateError(401, 'Expired or invalid token');
  }
};

export default tokenValidation;