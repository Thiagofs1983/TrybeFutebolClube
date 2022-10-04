import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

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

describe('teste da rota /teams', () => {
  describe('GET', () => {
    describe('Retorna todos os times', () => {
      before(() => {
        Sinon.stub(Team, 'findAll').resolves(mockTeams as Team[])
      });
  
      after(() => {
        Sinon.restore();
      })
  
      it('Retorna todos os times cadastrados no BD', async () => {
        const response = await chai.request(app).get('/teams');
        expect(response.body).to.deep.equal(mockTeams);
      });
      it('Retorna status 200', async () => {
        const response = await chai.request(app).get('/teams');
        expect(response.status).to.equal(200);
      });
    });

    describe('GET BY ID', () => {
      describe('Caso haja sucesso', () => {
        before(() => {
          Sinon.stub(Team, 'findByPk').resolves(mockTeams[0] as Team);
        });
        
        after(() => {
          Sinon.restore();
        });

        it('Retorna o time conforme id passado pela URL', async () => {
          const response = await chai.request(app).get('/teams/1');
          expect(response.body).to.deep.equal(mockTeams[0]);
        });
        it('Retorna o status 200', async () => {
          const response = await chai.request(app).get('/teams/1');
          expect(response.status).to.equal(200);
        });
      });

      describe('Caso NÃO haja sucesso na chamada', () => {
        before(() => {
          Sinon.stub(Team, 'findByPk').resolves(null);
        });

        after(() => {
          Sinon.restore();
        });

        it('Retorna a mensagem de erro "Team not found" caso não encontre nenhum time', async () => {
          const response = await chai.request(app).get('/teams/500');
          expect(response.body).to.deep.equal({ message: 'Team not found'});
        });
        it('Retorna o status 400', async () => {
          const response = await chai.request(app).get('/teams/500');
          expect(response.status).to.equal(400);
        });
      })
    });
  });
});
