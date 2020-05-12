# Boas vindas ao repositório do projeto de E-Commerce!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por _Slack_! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir desse repositório, utilizando uma branch específica e um _Pull Request_ para colocar seus códigos.

## O que deverá ser desenvolvido

Você vai desenvolver uma API simplificada de um e-commerce, utilizando tudo o que aprendeu nas aulas sobre JWT e IO!

Nela será possível cadastrar usuários com diferentes níveis de acesso e cadastar, consultar e comprar produtos, além de poder fazer upload de imagens para associá-las a esses produtos.

---

## Desenvolvimento

Nesse projeto, você não usará um banco de dados. Para treinar suas habilidades de leitura e escrita de arquivos em Node.js, todos os dados serão salvos em arquivos dentro do servidor de sua API. Em projetos futuros, você aprenderá a integrar bancos de dados como MySQL ou MongoDB às suas aplicações Node.js. Assim, você poderá apreciar melhor como um banco de dados pode trazer mais eficiência, consistência e segurança às suas aplicações!

Este repositório contem um _template_ com uma API REST criada usando Express. Você deve usá-la como base para seu projeto.

---

## Requisitos do projeto

### 1 - Crie um endpoint para cadastrar usuários

- O endpoint deve aceitar requisições `POST` na rota `/users`.

- O corpo das requisições para este endpoint deve ter o formato abaixo:

  ```json
  {
    "username": "johndoe",
    "password": "senhasupersecreta",
    "role": "entregador"
  }
  ```

- Ao receber uma requisição, sua API deve fazer validações nesses campos, como descrito a seguir:

  - `username` deve estar presente, deve conter somente letras e números, deve ter ao menos 6 caracteres e deve ser único;

  - `password` deve estar presente e deve ter ao menos 8 caracteres;

  - `role` deve estar presente e só pode conter os seguintes valores:

    - `funcionario`;

    - `entregador`;

    - `cliente`.

### 2 - Crie um endpoint para realizar login na API

- O endpoint deve receber requisições `POST` na rota `/login`.

- O endpoint deve receber um nome de usuário e senha, no formato abaixo:

  ```json
  {
    "username": "johndoe",
    "password": "senhasupersecreta"
  }
  ```

- O endpoint deve consultar se existe um usuário com as credenciais informadas. Caso exista, deve ser gerado um **token JWT** como resposta.

- O token retornado deve expirar em 3 dias e deverá levar em seu payload as propriedades `username` e `role` do usuário. O formato da resposta deve ser como exemplificado abaixo:

  ```json
  {
    "token": <token>,
    "expires": <tempo>,
  }
  ```

### 3 - Crie o recurso `products` na API

- Deve ser possível criar, atualizar, visualizar e apagar produtos. Deve ser possível visualizar um produto individual e, também, uma lista completa de produtos.

- A criação, atualização e exclusão de produtos devem ser protegidas por autenticação via JWT. A listagem de produtos deve ser aberta, ou seja, **não** deve ter autenticação. O token deve ser enviado no header `Authorization` da requisição.

- Existe a possibilidade do token ser válido, porém estar expirado. Dito isso, a data de expiração também deve ser validada.

- O corpo das requisições para criar e atualizar produtos devem ter o formato abaixo:

  ```json
  {
    "name": "Meu produto",
    "description": "Descriçãdo do meu produto",
    "price": 49.99
  }
  ```

- Ao receber uma requisição, sua API deve fazer validações nesses campos, como descrito a seguir:

  - `name` deve estar presente, deve conter somente letras e números e deve ter ao menos 5 caracteres;

  - `price` deve estar presente e ser um número maior que zero.

- Somente usuários que possuem o `role` com o valor `funcionario` devem poder criar, atualizar e excluir produtos, verificando se o **payload do token** recebido contém essa propriedade.

- Nas respostas das operações, um produto deve ter o seguinte formato:

  ```json
  {
    "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    "name": "Meu produto",
    "description": "Descrição do meu produto",
    "price": 49.99,
    "image": "http://localhost:3000/meu-produto.png"
  }
  ```

  Produtos que não têm imagens associadas não devem ter o campo `image` na resposta. Veja [requisito 6](#6---Crie-um-endpoint-para-cadastrar-imagens-para-um-produto) para mais detalhes.

### 4 - Crie o recurso `purchases` na API

- Deve ser possível criar, atualizar, visualizar e apagar compras. Deve ser possível visualizar uma compra individual e, também, uma lista completa de compras.

- Este endpoint deve ter autenticação via JWT. Porém, qualquer usuário pode visualizar, editar, excluir ou realizar compras, independente de seu `role`. Contudo, um usuário só pode visualizar compras que estão atreladas a sua conta, o mesmo vale para as ações de editar e excluir.

  **Nota**: A autenticação deve ser feita conforme descrito no [requisito 3](#3---Crie-o-recurso-products-na-api). Ou seja, você deve seguir os mesmos requisitos de autenticação descritos para o recurso produto. A única diferença é que o recurso compras aceita qualquer `role`, já o recurso produtos não.

- As operações desse recurso devem validar, também, a data de expiração do token, conforme descrito no [requisito 3](#3---Crie-o-recurso-products-na-api).

- Ao realizar uma compra, deve ser informado, no corpo da requisição, o id de um produto e a quantidade desejada, no seguinte formato:

  ```json
  {
    "productId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "quantity": 10
  }
  ```

- Ao editar uma compra já existente, deve ser informado, no corpo da requisição, o id do usuário, o id de um produto e a quantidade desejada, no seguinte formato:

  ```json
  {
    "userID": "123",
    "productId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "quantity": 5
  }
  ```

- Sua API deve fazer as seguintes validações:

  - Ao **atualizar** e **excluir** compras, o `userID` deve ser o id de um usuário que existe no arquivo `users.json`;

  - Ao **criar**, **atualizar** e **excluir** compras, o `productId` deve ser o id de um produto que existe no arquivo `products.json`;

  - Ao **criar** e **atualizar** compras, o `quantity` deve ser um inteiro maior que zero.

- Nas respostas das operações, uma compra deve ter o seguinte formato:

  ```json
  {
    "id": <id_da_compra>,
    "userID": <id_do_usuario>,
    "productId": <id_do_produto>,
    "quantity": <quantidade_comprada>
  }
  ```

### 6 - Crie um endpoint para cadastrar imagens para um produto

- O endpoint deve aceitar requisições `POST` na rota `/images`.

- A API deve receber uma imagem no campo `image` de uma requisição `multipart/form-data`.

- Esse endpoint deve ter autenticação via JTW.

  **Nota**: A rota deve ser autenticada conforme descrito no [requisito 3](#3---Crie-o-recurso-products-na-api). Ou seja, a autenticação de ambas as rotas são iguais e devem seguir os mesmos critérios.

- Este endpoint deve validar, também, a data de expiração do token, conforme descrito no [requisito 3](#3---Crie-o-recurso-products-na-api).

- Além da imagem, o corpo das requisições para este endpoint deve receber o id do produto, no seguinte formato:

  ```json
  {
    "productId": <id_do_produto>,
    "image": "minha-imagem.png"
  }
  ```

- As imagens recebidas deverão ser salvas no próprio servidor, na pasta `images`, com um nome único. Esse nome pode ser, por exemplo, o id do produto ao qual a imagem está relacionada.

- Uma requisição bem sucedida deve retornar a URL da imagem:

  ```json
  {
    "image": "http://localhost:3000/minha-imagem.png"
  }
  ```

- A imagem deve ser acessível através da URL retornada.

### 7 - Os dados de usuários, produtos e compras devem ser lidos e salvos de arquivos

- Os usuários, produtos e compras cadastrados devem ser salvos nos arquivos `users.json`, `products.json` e `purchases.json`, respectivamente, na raiz do projeto.

- Usuários cadastrados devem ter o seguinte formato:

  ```json
  {
    "id": <id_do_usuario>,
    "username": <username_do_usuario>,
    "password": <password_do_usuario>,
    "role": <role_do_usuario>
  }
  ```

- Os produtos salvos devem ter o seguinte formato:

  ```json
  {
    "id": <id_do_produto>,
    "name": <nome_do_produto>,
    "description": <descricao_do_produto>,
    "price": <preco_do_produto>
  }
  ```

- As compras salvas devem ter o seguinte formato:

  ```json
  {
    "id": <id_da_compra>,
    "userID": <id_do_usuario>,
    "productId": <id_do_produto>,
    "quantity": <quantidade_comprada>
  }
  ```

- O campo `id` de usuários, produtos e compras deve ser único e gerado no momento em que o recurso for criado. Como sugestão, você pode usar um [uuid](https://www.npmjs.com/package/uuid);

### 8 - Todos os seus endpoints devem estar no padrão REST

- Use os verbos HTTP adequados para cada operação.

- Agrupe e padronize suas URL em cada recurso.

- Garanta que seus endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não.

- Retorne os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório

- `git clone git@github.com:tryber/sd-01-block30-jwt-IO.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd sd-01-block30-jwt-IO`

2. Instale as dependências e inicialize o servidor

- Instale as dependências:
  - `npm install`
- Inicialize o servidor:
  - `node api/server.js`

3. Teste se sua API está funcionando corretamente:

- Utilizando um cliente REST como Postman, faça uma requisição POST para o endpoint `/users`.
- Ou, utilizando o `curl`:
  `curl -X POST http://localhost:8080/users`
- Deve aparecer a mensagem `{ "message": "Usuário cadastrado com sucesso" }`.
- Note que um usuário não é de fato cadastrado.

4. Crie uma branch a partir da branch `master`

- Verifique que você está na branch `master`
  - Exemplo: `git branch`
- Se não estiver, mude para a branch `master`
  - Exemplo: `git checkout master`
- Agora, crie uma branch onde você vai guardar os `commits` do seu projeto
  - Você deve criar uma branch no seguinte formato: `nome-de-usuário-nome-do-projeto`
  - Exemplo: `git checkout -b joaozinho-jwt-IO`

5. Adicione as mudanças ao _stage_ do Git e faça um `commit`

- Verifique que as mudanças ainda não estão no _stage_
  - Exemplo: `git status` (deve aparecer listada a pasta _components_ em vermelho)
- Adicione o novo arquivo ao _stage_ do Git
  - Exemplo:
    - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
    - `git status` (deve aparecer listado o arquivo _components/Header.jsx_ em verde)
- Faça o `commit` inicial
  - Exemplo:
    - `git commit -m 'iniciando o projeto jwt-IO'` (fazendo o primeiro commit)
    - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

6. Adicione a sua branch com o novo `commit` ao repositório remoto

- Usando o exemplo anterior: `git push -u origin joaozinho-jtw-IO`

7. Crie um novo `Pull Request` _(PR)_

- Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-01-block30-jwt-IO/pulls)
- Clique no botão verde _"New pull request"_
- Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
- Clique no botão verde _"Create pull request"_
- Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
- **Não se preocupe em preencher mais nada por enquanto!**
- Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-01-block30-jwt-IO/pulls) e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

- Faça `commits` das alterações que você fizer no código regularmente

- Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

- Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

- Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-01`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
