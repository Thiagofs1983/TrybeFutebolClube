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

export interface ITeam {
  id: number;
  teamName: string;
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

export interface IStatistic {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string,
}
export interface ILeaderboard {
  matchesFilter: IMatches[],
  totalPoints(team: ITeam): number,
  totalGames(team: ITeam): number,
  totalVictories(team: ITeam): number,
  totalDraws(): number,
  totalLosses(team: ITeam): number,
  goalsFavor(team: ITeam): number,
  goalsOwn(team: ITeam): number,
  goalsBalance(team: ITeam): number,
  efficiency(team: ITeam): string,
}
