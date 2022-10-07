# Projeto Trybe Futebol Clube

# Contexto
O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Foi desenvolvido **um back-end dockerizado utilizando modelagem de dados através do Sequelize**, respeitando as **regras de negócio** providas no projeto e **a API deve ser capaz de ser consumida por um front-end já provido nesse projeto**.

  Para adicionar uma partida é necessário ter um _token_, portanto a pessoa deverá estar logada para fazer as alterações. Temos um relacionamento entre as tabelas `teams` e `matches` para fazer as atualizações das partidas.

  O back-end implementa as regras de negócio para popular adequadamente a tabela disponível no front-end que será exibida para a pessoa usuária do sistema.

## Técnologias usadas

Back-end:
> Desenvolvido usando: TypeScript, Node, Sequelize, Express, MYSQL, ES6, JWT, Bcrypt, Mocha, Chai, Sinon


## Instalando Dependências

> Backend
```bash
  git clone git@github.com:Thiagofs1983/TrybeFutebolClube.git
  cd TrybeFutebolClube/ 
  npm install
``` 

## Executando aplicação

Para rodar a aplicação você vai precisar ter o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado e usar os seguintes comandos no terminal:

```
  cd app/
  npm run compose:up
```

### Para rodar o back-end:

  Para realizar as requisições em back-end, você pode usar a extensão [Thunder Client](https://www.thunderclient.com/) do VSCode ou pode usar os clientes HTTP [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).
  

### Para rodar o front-end:

  Para rodar o front-end que consome a API desenvolvida basta executar o comando abaixo a partir da raiz do projeto:

  ```
    cd app/frontend/ && npm start
  ```
  Você pode fazer o login na aplicação com o perfil de USUÁRIO comum e ter acesso a classificação geral ou filtrada por jogos em casa e fora, jogos finalizados e jogos em andamento usando o email `user@user.com` e senha `secret_user`.
  
  Você pode ainda fazer o login na aplicação com o perfil de ADMINISTRADOR, ter os mesmos acessos de USUÁRIO, além de poder acrescentar um novo jogo e editar o placar de jogos em andamento, usando o email `admin@admin.com` e senha `secret_admin`.

## Executando Testes

* Para rodar todos os testes:

  Para executar os testes de cobertura do back-end, entre na pasta `backend` rodando o seguinte comando no terminal a partir da raiz do projeto:

  ```
    cd app/backend/
  ```
  Renomeie o arquivo `.env.example` para `.env` e rode o comando abaixo:
  
  ```
    npm run test:coverage
  ```
