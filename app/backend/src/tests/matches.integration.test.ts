import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matche from '../database/models/matche';
// import { IUser } from '../interfaces'

import { Response } from 'superagent';
import tokenValidation from '../middlewares/auth';
import { request } from 'express';
import Team from '../database/models/team';

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
];

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
];

const mockSendNewMatch = {
  homeTeam: 16,
  awayTeam: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true 
};

const mockNewMatch = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: true,
}

const mockTeams = [
  {
    id: 1,
    teamName: "Atletico Mineiro",
  },
  {
    id: 2,
    teamName: "Qualquer outro",
  },
]

const tokenString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoidXNlcnNAdXNlci5jb20iLCJpYXQiOjE2NjQ1NDQ3NjcsImV4cCI6MTY2NTA2MzE2N30.2ngGmrxlskGN5QGW0o7nJZxCq5XdjjQMPVN9OlJTEWQ';

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
        Sinon.stub(Matche, 'findAll').resolves(mockMatchesFinsh as any);
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

  describe('POST', () => {
    describe('Cria um novo jogo', () => {
      /* describe('Caso haja sucesso', () => {
        before(() => {
          // Sinon.stub(jwt, 'verify').resolves(true);
          Sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
          Sinon.stub(Matche, 'create').resolves(mockNewMatch as Matche);
        });
    
        after(() => {
          Sinon.restore();
        });

        it('Retorna o novo jogo cadastrado no BD', async () => {
          const response = await chai.request(app).post('/matches').send(mockSendNewMatch).set('authorization', tokenString );
          expect(response.body).to.deep.equal(mockNewMatch);
        });
        it('Retorna o status 201', async () => {
          const response = await chai.request(app).post('/matches').send(mockSendNewMatch).set('authorization', tokenString );
          expect(response.status).to.equal(201);
        });
      }); */

      describe('Caso NÂO haja sucesso', () => {
        before(() => {
          // Sinon.stub(jwt, 'verify').resolves(true);
          Sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
          Sinon.stub(Matche, 'create').resolves(mockNewMatch as Matche);
        });
    
        after(() => {
          Sinon.restore();
        });

        it('Retorna a mensagem de erro "Token not found"', async () => {
          const response = await chai.request(app).post('/matches').send(mockSendNewMatch);
          expect(response.body).to.deep.equal({ message: 'Token not found' });
        });
        it('Retorna o status 201', async () => {
          const response = await chai.request(app).post('/matches').send(mockSendNewMatch);
          expect(response.status).to.equal(401);
        });
      });
    });
  });
});
