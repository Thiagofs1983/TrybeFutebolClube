import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const reqLogin = {
  email: "users@user.com",
  password: "1234567"
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
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal(mockTeams);
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
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(mockTeams[0]);
        });
      });
    });
  });
});
