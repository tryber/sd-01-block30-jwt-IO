const nock = require('nock');
const axiosist = require('axiosist');


describe('1 - Crie um endpoint para cadastrar usuários', () => {
  describe('O endpoint deve aceitar requisições POST na rota /users.', () => {
    
  });
  describe('O corpo das requisições para este endpoint deve ter o formato correto', () => {
    it(`username: johndoe,
        password: senhasupersecreta,
        role: entregador`, () => {
      
    });
  });
  describe('Ao receber uma requisição, sua API deve fazer validações nesses campos, como descrito a seguir:', () => {
    it('username deve estar presente, deve conter somente letras e números, deve ter ao menos 6 caracteres e deve ser único;', () => {
      
    });
    it('password deve estar presente e deve ter ao menos 8 caracteres;', () => {
      
    });
    it(`role deve estar presente e só pode conter os seguintes valores:
        → funcionario
        → entregador
        → cliente`, () => {
      
    });
  });
});