import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface Ilogin {
  email: string;
  password: string;
}

export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export interface IRequest extends Request {
  email?: string | JwtPayload;
}

export interface ISimpleMatches {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatches extends ISimpleMatches {
  id?: number,
  homeTeam: number,
  awayTeam: number,
  inProgress?: boolean,
}
