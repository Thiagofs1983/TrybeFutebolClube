import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import CustomError from '../errors/custom.erros';

const SECRET = process.env.JWT_SECRET;

const generateToken = (payload: string): string => {
  if (SECRET) {
    const token = jwt.sign({ payload }, SECRET, { algorithm: 'HS256', expiresIn: '6d' });
    return token;
  }
  throw new CustomError(404, 'Secret key required');
};

export default generateToken;
