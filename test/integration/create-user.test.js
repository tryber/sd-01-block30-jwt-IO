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

    // utils.getData.mockResolvedValue([
    //   {
    //     "username": "SUPIMPA",
    //     "password": "senhasupersecreta",
    //     "role": "entregador",
    //     "id": "8b1b3710-98c4-11ea-973a-03a03cf5cb15"
    //   },
    //   {
    //     "username": "SUPIMPAa",
    //     "password": "senhasupersecreta",
    //     "role": "entregador",
    //     "id": "5855f8f0-98c5-11ea-9632-33f98d409af1"
    //   }
    // ]);

    // utils.addItem.mockResolvedValue(
    //   {
    //     "username": "usuarioTeste8",
    //     "role": "entregador",
    //     "id": "aaab0420-a10e-11ea-8666-d1172ae9c846"
    //   }
    // )

    beforeAll(async () => {
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
  // describe('Quando o usuario é cadastrado com sucesso', () => {
  //   test('retorno 401 HTTP status code', () => {
  //   })
  //   test('retorna a mensagem de sucesso', () => {
  //   })
  //   test('retorna dos dados correto', () => {
  //   })
  // })
})







// const axiosist = require('axiosist');
// const app = require('../../../app');

// jest.setTimeout(10000);

// describe('The login endpoint', () => {
//   const api = axiosist(app.factory({ environment: 'test' }));

//   describe('When required parameters are missing', () => {
//     let response;

//     beforeAll(async () => {
//       response = await api.post('/login', {})
//         .catch(err => err.response);
//     });

//     it('Returns a 400 status code', () => {
//       expect(response.status).toStrictEqual(400);
//     });

//     it('Returns a `Missing fields` message', () => {
//       expect(response.data.message).toStrictEqual('Missing fields');
//     });
//   });

//   describe('When all parameters are given', () => {
//     let response;

//     beforeAll(async () => {
//       const data = { email: 'a@a.com', password: 'abc123' };
//       response = await api.post('/login', data)
//         .catch(err => err.response);
//     });

//     it('Returns a 200 status code', () => {
//       expect(response.status).toStrictEqual(200);
//     });

//     it('Returns a token', () => {
//       expect(response.data.token).toBeDefined;
//     });

//     describe('The token', () => {
//       it('Is a string', () => {
//         expect(typeof response.data.token).toStrictEqual('string');
//       });

//       it('Has 16 characters of length', () => {
//         expect(response.data.token).toHaveLength(16);
//       });
//     });
//   });
// });
