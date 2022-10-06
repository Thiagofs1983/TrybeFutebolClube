import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matche from '../database/models/matche';
import { Response } from 'superagent';
import Team from '../database/models/team';
import { tokenString } from './mock/token.mock';
import { mockEqualTeams, mockNonexistentTeam, mockTeams } from './mock/team.mock';
import { mockMatches, mockMatchesFinsh, mockNewMatch, mockSendNewMatch, mockUpdate } from './mock/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

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
      
      describe('Caso NÃO haja sucesso', () => {
        before(() => {
          Sinon.stub(Matche, 'update').resolves([ 0, [new Matche] ])
        });
        after(() => {
          Sinon.restore();
        });

        it('Retorna a mensagem "It is not possible to update a match" caso a atualização NÃO seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50/finish');
          expect(response.body).to.deep.equal({ message: 'It is not possible to update a match' });
        });
        it('Retorna o status 400 caso a atualização NÃO seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50/finish');
          expect(response.status).to.equal(400);
        });
      });
    });

    describe('Atualiza o numero de gols dos times', () => {
      describe('Caso de atualização bem sucedida', () => {
        before(() => {
          Sinon.stub(Matche, 'update').resolves([ 1, [new Matche] ]);
        });
        after(() => {
          Sinon.restore();
        });

        it('Retorna a mensagem "Finished" caso a atualização seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50').send(mockUpdate);
          expect(response.body).to.deep.equal({ message: 'Finished' });
        });
        it('Retorna o status 200 caso a atualização seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50').send(mockUpdate);
          expect(response.status).to.equal(200);
        });
      });

      describe('Caso NÃO haja sucesso', () => {
        before(() => {
          Sinon.stub(Matche, 'update').resolves([ 0, [new Matche] ])
        });
        after(() => {
          Sinon.restore();
        });

        it('Retorna a mensagem "It is not possible to update a match" caso a atualização NÃO seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50');
          expect(response.body).to.deep.equal({ message: 'It is not possible to update a match' });
        });
        it('Retorna o status 400 caso a atualização NÃO seja bem sucedida', async () => {
          const response = await chai.request(app).patch('/matches/50');
          expect(response.status).to.equal(400);
        });
      });
    });
  });
});
