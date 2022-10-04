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
import { error } from 'console';

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

const mockEqualTeams = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 1,
  awayTeam: 1,
  awayTeamGoals: 1,
  inProgress: true,
}

const mockNonexistentTeam = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 1111,
  awayTeam: 13,
  awayTeamGoals: 1,
  inProgress: true,
}

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
      describe('Caso haja sucesso', () => {
        before(() => {
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
      });

      describe('Caso NÃO haja sucesso', () => {
        describe('Casos de erro de token', () => {
          before(() => {
            Sinon.stub(jwt, 'verify').throws();
          });
      
          after(() => {
            Sinon.restore();
          });
  
          it('Retorna a mensagem de erro "Token not found" caso não haja token', async () => {
            const response = await chai.request(app).post('/matches').send(mockSendNewMatch);
            expect(response.body).to.deep.equal({ message: 'Token not found' });
          });
          it('Retorna o status 401 caso não haja um token', async () => {
            const response = await chai.request(app).post('/matches').send(mockSendNewMatch);
            expect(response.status).to.equal(401);
          });
          it('Retorna a mensagem de erro "Token must be a valid token" caso o token não seja válido', async () => {
            const response = await chai.request(app).post('/matches').send(mockSendNewMatch).set('authorization', 'tokenString');
            expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
          });
          it('Retorna o status 401 caso o token não seja válido', async () => {
            const response = await chai.request(app).post('/matches').send(mockSendNewMatch).set('authorization', 'tokenString');
            expect(response.status).to.equal(401);
          });
        });
        
        describe('Casos de Erro em Services', () => {
          before(() => {
            Sinon.stub(Team, 'findAll').resolves([{ id: 1, teamName: 'Atletico'}] as Team[]);
            Sinon.stub(Matche, 'create').resolves(mockNewMatch as Matche);
          });
          after(() => {
            Sinon.restore();
          });

          it('Retorna a mensagem de erro "It is not possible to create a match with two equal teams" caso se tente criar um novo jogo com times iguais', async () => {
            const response = await chai.request(app).post('/matches').send(mockEqualTeams).set('authorization', tokenString);
            expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
          });
          it('Retorna o status 401 caso se tente criar um novo jogo com times iguais', async () => {
            const response = await chai.request(app).post('/matches').send(mockEqualTeams).set('authorization', tokenString);
            expect(response.status).to.equal(401);
          });
          it('Retorna a mensagem de erro "There is no team with such id!" caso id do time seja inexistente', async () => {
            const response = await chai.request(app).post('/matches').send(mockNonexistentTeam).set('authorization', tokenString);
            expect(response.body).to.deep.equal({ message: 'There is no team with such id!' });
          });
          it('Retorna o status 404 caso id do time seja inexistente', async () => {
            const response = await chai.request(app).post('/matches').send(mockNonexistentTeam).set('authorization', tokenString);
            expect(response.status).to.equal(404);
          });
        });
      });
    });
  });
  
  describe('PATCH', () => {
    describe('Atualiza status da partida', () => {
      describe('Caso haja sucesso', () => {
        before(() => {
          Sinon.stub(Matche, 'update').resolves([ 1, [new Matche] ])
        });
        after(() => {
          Sinon.restore();
        });

        it('Retorna a mensagem "Finished" caso a atualização seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50/finish');
          expect(response.body).to.deep.equal({ message: 'Finished' });
        });
        it('Retorna o status 200 caso a atualização seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50/finish');
          expect(response.status).to.equal(200);
        });
      });
    });
  });
});
