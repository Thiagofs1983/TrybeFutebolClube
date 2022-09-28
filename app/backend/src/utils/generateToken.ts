import * as jwt from 'jsonwebtoken';
import 'dotenv';

const SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (payload: string): string => {
  const token = jwt.sign({ payload }, SECRET, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
};

export default generateToken;