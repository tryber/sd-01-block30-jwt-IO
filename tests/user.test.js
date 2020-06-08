const axiosist = require('axiosist');
const fs = require('fs').promises;
const app = require('../api/server');
const fixtures = require('./fixtures/user');
const utils = require('../models/utils');

fs.writeFile = jest.fn();
jest.setTimeout(10000);

const spyGetData = jest.spyOn(utils, 'getData');

describe('POST /users', () => {
  const axios = axiosist(app);

  describe('when required data is missing', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/users', {});
    });

    it('returns a 400 HTTP status code', () => {
      expect(response.status).toBe(400);
    });

    it('returns a `Campos vazios!` error message', () => {
      expect(response.data.message).toBe('Campos vazios!');
    });
  });

  describe('when username is invalid', () => {
    let response;

    describe('when username already exists', () => {
      spyGetData.mockResolvedValue([{
        username: 'repetido',
        password: 'senhasupersecreta',
        role: 'funcionario',
      }]);

      beforeAll(async () => {
        response = await axios.post('/users', fixtures.invalidUsernameNotUnique);
      });
  
      it('returns 422 a HTTP status code', () => {
        expect(response.status).toBe(422);
      });

      it('returns a `Dados inválidos` message', () => {
        expect(response.data.message).toBe('Dados inválidos!');
      });
    });

    describe('when username has 6 or less characteres', () => {
      beforeAll(async () => {
        response = await axios.post('/users', fixtures.invalidUsername);
      });
  
      it('returns 422 a HTTP status code', () => {
        expect(response.status).toBe(422);
      });
  
      it('returns a `Dados inválidos` message', () => {
        expect(response.data.message).toBe('Dados inválidos!');
      });
    });

    describe('when username has special characters', () => {
      beforeAll(async () => {
        response = await axios.post('/users', fixtures.invalidUsernameSpecialCharacters);
      });
  
      it('returns 422 a HTTP status code', () => {
        expect(response.status).toBe(422);
      });
  
      it('returns a `Dados inválidos` message', () => {
        expect(response.data.message).toBe('Dados inválidos!');
      });
    });
  });

  describe('when password is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/users', fixtures.invalidPassword);
    });

    it('returns 422 a HTTP status code', () => {
      expect(response.status).toBe(422);
    });

    it('returns a `Dados inválidos` message', () => {
      expect(response.data.message).toBe('Dados inválidos!');
    });
  });

  describe('when role is invalid', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/users', fixtures.invalidRole);
    });

    it('returns 422 a HTTP status code', () => {
      expect(response.status).toBe(422);
    });

    it('returns a `Dados inválidos` message', () => {
      expect(response.data.message).toBe('Dados inválidos!');
    });
  });

  describe('when everything is ok', () => {
    let response;

    beforeAll(async () => {
      response = await axios.post('/users', fixtures.validUser);
    });

    it('returns a 201 HTTP status code', () => {
      expect(response.status).toBe(201);
    });

    it('returns a `Usuário cadastrado com sucesso` message', () => {
      expect(response.data.message).toBe('Usuário cadastrado com sucesso');
    });
  });
});
