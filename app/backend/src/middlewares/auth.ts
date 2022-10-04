import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { IRequest } from '../interfaces';
import HttpValidateError from '../errors/validation.erros';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;

const tokenValidation = (req: IRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpValidateError(401, 'Token not found');
  }

  try {
    if (SECRET) {
      const payload = jwt.verify(authorization, SECRET);
      req.email = payload as unknown as IRequest;
      next();
    }
  } catch (error) {
    throw new HttpValidateError(401, 'Token must be a valid token');
  }
};

export default tokenValidation;
