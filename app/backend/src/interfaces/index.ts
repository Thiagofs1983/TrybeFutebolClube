import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

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

export interface IMatches {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}