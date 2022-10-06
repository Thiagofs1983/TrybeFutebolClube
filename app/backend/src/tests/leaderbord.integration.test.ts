import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matche from '../database/models/matche';
import { Response } from 'superagent';
import Team from '../database/models/team';
import { mockTeams } from './mock/team.mock';
import { mockMatchesFinsh } from './mock/match.mock';
import { mockLeaderboard, mockLeaderboardAway, mockLeaderboardHome } from './mock/leaderboard.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('teste da rota /leaderboard/home', () => {
  describe('GET', () => {
    describe('Mostra a classificação dos times', () => {
      before(() => {
        Sinon.stub(Matche, 'findAll').resolves(mockMatchesFinsh as any);
        Sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
      });
  
      after(() => {
        Sinon.restore();
      });
  
      it('Retorna a classificação dos times da casa', async () => {
        const response = await chai.request(app).get('/leaderboard/home');
        expect(response.body).to.deep.equal(mockLeaderboardHome);
      });
      it('Retorna o status 200 para times da casa', async () => {
        const response = await chai.request(app).get('/leaderboard/home');
        expect(response.status).to.equal(200);
      });
      it('Retorna a classificação dos times visitantes', async () => {
        const response = await chai.request(app).get('/leaderboard/away');
        expect(response.body).to.deep.equal(mockLeaderboardAway);
      });
      it('Retorna o status 200 para times visitantes', async () => {
        const response = await chai.request(app).get('/leaderboard/away');
        expect(response.status).to.equal(200);
      });
      it('Retorna a classificação geral dos times', async () => {
        const response = await chai.request(app).get('/leaderboard');
        expect(response.body).to.deep.equal(mockLeaderboard);
      });
      it('Retorna o status 200 para a classificação geral dos times', async () => {
        const response = await chai.request(app).get('/leaderboard');
        expect(response.status).to.equal(200);
      });
    });
  });
});
