
# 🟪 POSTECH - Hackathon (Time-Punch)

Este projeto faz parte da composição de nota do curso de Pós Gradução de Software Architecture (POSTECH) da FIAP, onde o Hackathon iniciou-se no dia 18/03/2024 e encerrou-se em 23/03/2024. A aplicação consiste em um simples sistema de ponto.

## ✅ Features

- Autorização de Usuários (Login - JWT)
- Cadastro de Usuários
- Registro de Ponto
- Visualização de Registros
- Relatórios

## 💻 Rodando localmente

#### 1. Clone o projeto

```bash
git clone https://github.com/augustoefr/postech-soat-hackaton.git
```

#### 2. Entre no diretório do projeto

```bash
cd postech-soat-hackaton
```

#### 3. Instale as dependências

```bash
yarn install
#ou npm install
```

#### 4. Inicie o Banco de Dados
Antes de executar o projeto, caso não tenha o PostgreSQL instalado localmente, mas tiver o Docker instalado, pode executar o seguinte comando:

```bash
docker-compose up -d database
```

Inicie o sistema

```bash
yarn dev
#ou npm run dev
```

A aplicação poderá ser acessada via http://localhost:3000

## 🚀 API Reference

Abaixo estão descritos os endpoints disponibilizados pela aplicação.

> **_NOTE:_** Os endpoints de Registro de Ponto, Visualização de Registros e Relatórios necessitam que se esteja autorizado para acessá-los. Para isso, ao efetuar o login, passe o token da resposta no cabeçalho nas requisições mencioanadas, no padrão `Authorization': 'Bearer ` + `token`.

### Cadastrar usuários

```
  POST /register
```

| Body params | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Nome do usuário |
| `email` | `string` | **Required**. Email do usuário |
| `matriculation` | `string` | **Required**. Matricula do usuário (ex: RM1234) |
| `password` | `string` | **Required**. Senha do usuário |

**Response**

```json
{
  "id": 1,
  "name": "Augusto",
  "email": "augusto@email.com",
  "matriculation": "RM4364",
  "password": "$2b$12$YLD8nqTOwK.GWogvlBq.jez2tSZBCsCLSJMZ0R4IFxwkOsJFRnsdS"
}
```


### Login

```
  POST /login
```

| Body params | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `login`      | `string` | **Required**. Nome ou Matricula do usuário |
| `password` | `string` | **Required**. Senha do usuário |

**Response**

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoie1wiaWRcIjo1LFwibmFtZVwiOlwiQXVndXN0b1wiLFwiZW1haWxcIjpcImF1Z3VzdG9lZnJAZ21haWwuY29tXCIsXCJtYXRyaWN1bGF0aW9uXCI6XCJSTTE1NDhcIixcInBhc3N3b3JkXCI6XCIkMmIkMTIkWUxEOG5xVE93Sy5HV29ndmxCcS5qZXoydFNaQkNzQ0xTSk1aMFI0SUZ4d2tPc0pGUm5zZFNcIn0iLCJpYXQiOjE3MTEzNDMzMDIsImV4cCI6MTcxMTM0NjkwMn0.mEu4iOD-PV8a9-4eqIFu7DDx0rFjsV2bxu-O_XQrP5o"
}
```

### Registro de Ponto

```
  POST /time-punch
```

| Header key | Description                      |
| :--------- | :-------------------------------- |
| `Authorization`  | **Required**. O token do usuário autorizado |


**Response**

```json
{
  "id": 1,
  "time": "2024-03-23T05:08:44.477Z",
  "employee": {
    "id": 1,
    "name": "Augusto",
    "email": "augusto@email.com",
    "matriculation": "RM4364",
    "password": "$2b$12$YLD8nqTOwK.GWogvlBq.jez2tSZBCsCLSJMZ0R4IFxwkOsJFRnsdS"
  }
}
```

### Visualização de Registros

```
  GET /time-punch/:year/:month/:day
```

| Header key | Description                      |
| :--------- | :-------------------------------- |
| `Authorization`  | **Required**. O token do usuário autorizado |

| URL Params | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `year`     | `number` | **Required**. Ano que deseja consultar |
| `month`    | `number` | **Required**. Mês que deseja consultar |
| `day`      | `number` | **Required**. Dia que deseja consultar |


**Response**

```json
[
  {
    "id": 1,
    "time": "2024-03-23T05:08:38.669Z"
  },
  {
    "id": 2,
    "time": "2024-03-23T05:08:41.505Z"
  },
  {
    "id": 3,
    "time": "2024-03-23T05:08:42.782Z"
  },
  {
    "id": 4,
    "time": "2024-03-23T05:08:44.477Z"
  }
]
```

### Relatórios

```
  POST /time-punch/report/:year/month
```

| Header key | Description                      |
| :--------- | :-------------------------------- |
| `Authorization`  | **Required**. O token do usuário autorizado |

| URL Params | Type     | Description                       |
| :--------  | :------- | :-------------------------------- |
| `year`     | `number` | **Required**. Ano que deseja gerar o relatório |
| `month`    | `number` | **Required**. Mês que deseja gerar o relatório |


**Response**

```json
{
  "employee": {
    "id": 1,
    "name": "Augusto",
    "email": "augusto@email.com",
    "matriculation": "RM4364",
    "password": "$2b$12$YLD8nqTOwK.GWogvlBq.jez2tSZBCsCLSJMZ0R4IFxwkOsJFRnsdS"
  },
  "workdays": [
    {
      "workingHours": 0,
      "formattedWorkingHours": "00:00",
      "hasInconsistencies": false,
      "timePunches": [
        {
          "id": 1,
          "time": "2024-03-23T05:08:38.669Z"
        },
        {
          "id": 2,
          "time": "2024-03-23T05:08:41.505Z"
        },
        {
          "id": 3,
          "time": "2024-03-23T05:08:42.782Z"
        },
        {
          "id": 4,
          "time": "2024-03-23T05:08:44.477Z"
        }
      ],
      "day": "2024-03-23T00:00:00.000Z"
    }
  ],
  "maxPunchesLength": 4,
  "totalWorkingHours": 0,
  "formattedWorkingHours": "00:00"
}
```
