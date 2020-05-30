describe('3 - Crie o recurso products na API', () => {
  it(`Deve ser possível criar, atualizar, visualizar e apagar produtos.
    Deve ser possível visualizar um produto individual e,
    também, uma lista completa de produtos.`, () => {
    
  });
  it(`A criação, atualização e exclusão de produtos devem ser protegidas por autenticação via JWT.
    A listagem de produtos deve ser aberta,   ou seja, não deve ter autenticação.
    O token deve ser enviado no header Authorization da requisição.`, () => {
    
  });
  it(`Existe a possibilidade do token ser válido, porém estar expirado.
    Dito isso, a data de expiração também deve ser validada.`, () => {
    
  });
  it(`O corpo das requisições para criar e atualizar produtos devem ter o formato abaixo:
    {
      "name": "Meu produto",
      "description": "Descriçãdo do meu produto",
      "price": 49.99
    }`, () => {
    
  });
  describe('Ao receber uma requisição, sua API deve fazer validações nesses campos, como descrito a seguir:', () => {
    it('name deve estar presente, deve conter somente letras e números e deve ter ao menos 5 caracteres;', () => {
      
    });
    it('price deve estar presente e ser um número maior que zero.', () => {
      
    });
  });
  it(`Somente usuários que possuem o role com o valor funcionario devem poder criar,
    atualizar e excluir produtos, verificando se o payload do token recebido contém essa propriedade.`, () => {
    
  });
  it(`Nas respostas das operações, um produto deve ter o seguinte formato:
  {
    "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    "name": "Meu produto",
    "description": "Descrição do meu produto",
    "price": 49.99,
    "image": "http://localhost:3000/meu-produto.png"
  }`, () => {
    
  });
  
});