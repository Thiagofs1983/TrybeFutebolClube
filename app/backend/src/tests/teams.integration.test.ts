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
  });
});
