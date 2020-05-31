describe('Crie o recurso purchases na API', () => {
  it(`Deve ser possível criar, atualizar, visualizar e apagar compras.
    Deve ser possível visualizar uma compra individual e,
    também, uma lista completa de compras.`, () => {
    
  });
  it(`Este endpoint deve ter autenticação via JWT. Porém, qualquer usuário pode visualizar,
    editar, excluir ou realizar compras, independente de seu role.
    Contudo, um usuário só pode visualizar compras que estão atreladas a sua conta,
    o mesmo vale para as ações de editar e excluir.`, () => {
    
  });
  it(`As operações desse recurso devem validar, também, a data de expiração do token,
    conforme descrito no requisito 3.`, () => {
    
  });
  it(`Ao realizar uma compra, deve ser informado, no corpo da requisição,
    o id de um produto e a quantidade desejada, no seguinte formato:
  {
    "productId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "quantity": 10
  }`, () => {
    
  });
  it(`Ao editar uma compra já existente, deve ser informado, no corpo da requisição,
    o id do usuário, o id de um produto e a quantidade desejada, no seguinte formato:
  {
    "userID": "123",
    "productId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "quantity": 5
  }`, () => {
    
  });
  describe('Sua API deve fazer as seguintes validações:', () => {
    it('Ao atualizar e excluir compras, o userID deve ser o id de um usuário que existe no arquivo users.json', () => {
      
    });
    it(`Ao criar, atualizar e excluir compras, o productId deve ser o id
      de um produto que existe no arquivo products.json`, () => {
      
    });
    it('Ao criar e atualizar compras, o quantity deve ser um inteiro maior que zero.', () => {
      
    });
  })
  it(`Nas respostas das operações, uma compra deve ter o seguinte formato:
  {
    "id": <id_da_compra>,
    "userID": <id_do_usuario>,
    "productId": <id_do_produto>,
    "quantity": <quantidade_comprada>
  }`, () => {
    
  });
  
  
})
