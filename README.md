# Projeto Trybe Futebol Clube

# Contexto
O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  Foi desenvolvido **um back-end dockerizado utilizando modelagem de dados através do Sequelize**, respeitando as **regras de negócio** providas no projeto e **a API deve ser capaz de ser consumida por um front-end já provido pela Trybe nesse projeto**.

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
  
#### ENDPOINTS

<details>
  <summary><strong> Login </strong></summary>
  
  - Para realizar o login utilize o método `POST` com a URL http://localhost:3001/login e na aba `Body` o json abaixo:
  ```
  {
    "email": "admin@admin.com",
    "password": "secret_admin"
}
  ```
  Caso bem sucedida, a requisição deverá gerar um TOKEN.
  
  - Para saber o tipo de usuário que realizou o login, na aba `Headers` do seu cliente Http [Thunder Client](https://www.thunderclient.com/), [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/) acrescente a chave `Authorization` com o token gerado ao fazer o login. Em seguida utilize o método `GET` com a URL http://localhost:3001/login/validate.
  
</details>

<details>
  <summary><strong> Times </strong></summary>
  
  - Para pesquisar os times cadastrados, utilize o método `GET` com a URL http://localhost:3001/teams;
  - Para um time pelo seu id, utilize o método `GET` com a URL http://localhost:3001/teams/1.
  
</details>

<details>
  <summary><strong> Jogos </strong></summary>
  
  - Para pesquisar todos os jogos já realizados e em andamento, utilize o método `GET` com a URL http://localhost:3001/matches;
  - Para pesquisar apenas os jogos já finalizados, utilize o método `GET` com a URL http://localhost:3001/matches?inProgress=false;
  - Para pesquisar apenas os jogos em andamento, utilize o método `GET` com a URL http://localhost:3001/matches?inProgress=true;
  - Para adicionar um novo jogo, utilize o método `POST` com a URL http://localhost:3001/matches e na aba `Body` o json abaixo:
  ```
  {
    "homeTeam": 1,
    "awayTeam": 6,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
}
  ```
  *Obs.: É necessário que haja um TOKEN válido do tipo **admin** na chave `Authorization` da aba `Headers` e que os valores das chaves `homeTeam` e `awayTeam` sejam de times cadastrados no banco de dados e não sejam iguais. Caso contrário, a requisição retornará um erro indicativo.*
  - Para alterar o status da partida de *em andamento* para *finalizado*, utilize o método `PATCH` com a URL http://localhost:3001/matches/45/finish;
  - Para alterar o placar de uma partida em andamento, utilize o método `PATCH` com a URL http://localhost:3001/matches/47 e na aba `Body` o json abaixo:
  ```
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
}
  ```
  
</details>

<details>
  <summary><strong> Classificação </strong></summary>
  
  - Para ver a classificação geral dos times, utilize o método `GET` com a URL http://localhost:3001/leaderboard;
  - Para ver a classificação dos times filtrado pelos jogos em que eram mandantes, utilize o método `GET` com a URL http://localhost:3001/leaderboard/home;
  - Para ver a classificação dos times filtrado pelos jogos em que eram visitantes, utilize o método `GET` com a URL http://localhost:3001/leaderboard/away;
  
</details>

### Para rodar o front-end:

  Para rodar o front-end que consome a API desenvolvida basta executar o comando abaixo a partir da raiz do projeto:

  ```
    cd app/frontend/ && npm start
  ```
  Você pode fazer o login na aplicação com o perfil de USUÁRIO comum e ter acesso a classificação geral ou filtrada por jogos em casa e fora, jogos finalizados e em andamento usando o email `user@user.com` e senha `secret_user`.
  
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
[<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" height='30'>](https://www.linkedin.com/in/fsthiago/)
