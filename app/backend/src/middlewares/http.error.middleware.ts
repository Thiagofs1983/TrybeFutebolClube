import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import CustomError from '../errors/custom.erros';

const HttpErrorMiddlewares = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as CustomError;
  res.status(status || 500).json({ message });
};

export default HttpErrorMiddlewares;
