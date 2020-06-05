const axiosist = require('axiosist');
const app = require('../../app');
const fs = require('fs').promises;
const utils = require('../../models/utils');

const spyGetData = jest.spyOn(utils, 'getData');
fs.writeFile = jest.fn();

jest.setTimeout(10000);

describe('POST /users', () => {
  const api = axiosist(app.factory());

  describe('When required parameters are missing', () => {
    let response;

    beforeAll(async () => {
      response = await api.post('/users', {})
    });

    test('retorno 422 HTTP status code', () => {
      expect(response.status).toBe(422);
    })
    test('retorno de mensagem de erro', () => {
      expect(response.data.message).toBe('Faltou algum campo');
    })
  })

  describe('Quando cadastra um usuario', () => {
    let response;

    spyGetData.mockResolvedValue([
      {
        "username": "SUPIMPA",
        "password": "senhasupersecreta",
        "role": "entregador",
        "id": "8b1b3710-98c4-11ea-973a-03a03cf5cb15"
      },
      {
        "username": "SUPIMPAa",
        "password": "senhasupersecreta",
        "role": "entregador",
        "id": "5855f8f0-98c5-11ea-9632-33f98d409af1"
      }
    ]);

    beforeAll(async () => {
      const api = axiosist(app.factory());
      response = await api.post('/users', {
        "username": "usuarioTeste8",
        "password": "Usuario10",
        "role": "entregador"
      })
    });

    test('retorno 201 funcionou', () => {
      expect(response.status).toBe(201);
    })

    test('retorna o usuario', () => {
      expect(response.data.data.username).toBe('usuarioTeste8');
    })
  })
})
