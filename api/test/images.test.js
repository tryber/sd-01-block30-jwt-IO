describe('Crie um endpoint para cadastrar imagens para um produto', () => {
  it('O endpoint deve aceitar requisições POST na rota /images.', () => {
    
  });
  it('A API deve receber uma imagem no campo image de uma requisição multipart/form-data.', () => {
    
  });
  it('Esse endpoint deve ter autenticação via JTW.', () => {
    
  });
  it('Este endpoint deve validar, também, a data de expiração do token, conforme descrito no requisito 3.', () => {
    
  });
  it(`Além da imagem, o corpo das requisições para este endpoint deve receber o id do produto, no seguinte formato:
  {
    "productId": <id_do_produto>,
    "image": "minha-imagem.png"
  }`, () => {
    
  });
  it(`As imagens recebidas deverão ser salvas no próprio servidor, na pasta images, com um nome único. Esse nome pode ser,
    por exemplo, o id do produto ao qual a imagem está relacionada.`, () => {
    
  });
  it(`Uma requisição bem sucedida deve retornar a URL da imagem:
  {
    "image": "http://localhost:3000/minha-imagem.png"
  }`, () => {
    
  });
  it(`A imagem deve ser acessível através da URL retornada.`, () => {
    
  });
})
