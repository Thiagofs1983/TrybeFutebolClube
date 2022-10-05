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

const mockValidate = {
  "id": 2,
  "username": "User",
  "role": "user",
  "email": "user@user.com",
  "password": "$2a$08$Y8Abi8jXvsXyqm"
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

      it('Caso não informe email, retorna um erro com status 400 e mensagem "All fields must be filled"', async () => {
        const response = await chai.request(app).post('/login').send({ password: 'teste123' });
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
      });

      it('Caso não informe password, retorna um erro com status 400 e mensagem "All fields must be filled"', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'teste@teste.com' });
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
      });

      it('Caso password seja <= 6 caracteres, retorna um erro com status 400 e mensagem ""password" length must be at least 7 characters long"', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'teste@teste.com', password: 'teste' });
        expect(response.status).to.equal(400);
        expect(response.body).to.deep.equal({ message: '"password" length must be at least 7 characters long' });
      });
    });
  });
});

describe('Teste da rota /login/validate', () => {
  describe('GET', () => {
    describe('Caso haja sucesso', () => {
      before(() => {
        Sinon.stub(User, 'findOne').resolves(mockValidate as any);
      });
      after(() => {
        Sinon.restore();
      });
      it('Autoriza o acesso e retorna o tipo de usuário na mensagem', async () => {
        const response = await chai.request(app).get('/login/validate').set('authorization', tokenString);
        expect(response.status).to.equal(200);
        expect(response.body).to.deep.equal({ role: 'user' });
      });
    });
  });
});
