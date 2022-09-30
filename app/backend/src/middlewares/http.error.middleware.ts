import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import HttpValidateError from '../errors/validation.erros';

const HttpErrorMiddlewares = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpValidateError;
  res.status(status || 500).json({ message });
};

export default HttpErrorMiddlewares;
