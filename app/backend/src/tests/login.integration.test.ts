import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
// import { IUser } from '../interfaces'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const reqLogin = {
  "email": "users@user.com",
  "password": "1234567"
}

const mockUser = {
  id: 1,
  email: "users@user.com",
  password: "1234567",
  username: 'Usuario1',
  role: 'usuario'
}

const token = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoidXNlcnNAdXNlci5jb20iLCJpYXQiOjE2NjQ1NDQ3NjcsImV4cCI6MTY2NTA2MzE2N30.2ngGmrxlskGN5QGW0o7nJZxCq5XdjjQMPVN9OlJTEWQ"
}

describe('teste da rota /login', () => {
  describe('POST', () => {

    before(() => {
      Sinon.stub(User, 'findOne').resolves(mockUser as User)
    });

    after(() => {
      Sinon.restore();
    })

    it('Retorna um token caso os dados sejam válidos', async () => {
      const response = await chai.request(app).post('/login').send(reqLogin);
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(token);
    });
  });
});
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
