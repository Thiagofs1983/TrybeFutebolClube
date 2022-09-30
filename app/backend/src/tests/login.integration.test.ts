import * as Sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
// import { IUser } from '../interfaces'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const reqLogin = {
  email: "users@user.com",
  password: "1234567"
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

const tokenString = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoidXNlcnNAdXNlci5jb20iLCJpYXQiOjE2NjQ1NDQ3NjcsImV4cCI6MTY2NTA2MzE2N30.2ngGmrxlskGN5QGW0o7nJZxCq5XdjjQMPVN9OlJTEWQ';

describe('teste da rota /login', () => {
  describe('POST', () => {
    describe('Caso haja sucesso', () => {
      before(() => {
        Sinon.stub(User, 'findOne').resolves(mockUser as User)
        Sinon.stub(bcrypt, 'compareSync').returns(true)
        Sinon.stub(jwt, 'sign').returns(tokenString as any);
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
    describe('Caso não haja sucesso', () => {
      before(() => {
        Sinon.stub(User, 'findOne').resolves(null);
        Sinon.stub(bcrypt, 'compareSync').returns(false);
      });
      after(() => {
        Sinon.restore();
      })

      it('Retorna um erro com status 401 e mensagem "Incorrect email or password"', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'teste@teste.com', password: 'teste123' });
        expect(response.status).to.equal(401);
        expect(response.body).to.deep.equal({ message: 'Incorrect email or password' });
      });
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
