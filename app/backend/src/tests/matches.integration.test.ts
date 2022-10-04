import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matche from '../database/models/matche';
// import { IUser } from '../interfaces'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


const mockMatches = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: true,
    teamHome: {
      teamName: "Internacional"
    },
    teamAway: {
      teamName: "Santos"
    }
  },
]

const mockMatchesFinsh = [
  {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  },
  {
    id: 2,
    homeTeam: 9,
    homeTeamGoals: 1,
    awayTeam: 14,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "Internacional"
    },
    teamAway: {
      teamName: "Santos"
    }
  },
]

describe('teste da rota /matches', () => {
  describe('GET', () => {
    describe('Busca todos os jogos', () => {
      before(() => {
        Sinon.stub(Matche, 'findAll').resolves(mockMatches as any)
      });
  
      after(() => {
        Sinon.restore();
      });
  
      it('Retorna todos os jogos cadastrados no BD', async () => {
        const response = await chai.request(app).get('/matches');
        expect(response.body).to.deep.equal(mockMatches);
      });
      it('Retorna o status 200', async () => {
        const response = await chai.request(app).get('/matches');
        expect(response.status).to.equal(200);
      });
    });

    describe('Busca todos os jogos que já finalizaram', () => {
      before(() => {
        Sinon.stub(Matche, 'findAll').resolves(mockMatchesFinsh as any)
      });
  
      after(() => {
        Sinon.restore();
      });

      it('Retorna todos os jogos cadastrados já finalizados no BD', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false');
        expect(response.body).to.deep.equal(mockMatchesFinsh);
      });
      it('Retorna o status 200', async () => {
        const response = await chai.request(app).get('/matches?inProgress=false');
        expect(response.status).to.equal(200);
      });
    });
  });
});