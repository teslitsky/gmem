# GMEM Test Task

[![Build Status](https://travis-ci.org/teslitsky/gmem.svg?branch=master)](https://travis-ci.org/teslitsky/gmem)
[![Coverage Status](https://coveralls.io/repos/github/teslitsky/gmem/badge.svg?branch=master)](https://coveralls.io/github/teslitsky/gmem?branch=master)

## How to use

### Build and Run the App

Install dependencies:

```sh
$ npm install
```

Set Environment variables

```sh
$ cp .env.example .env
```

Run migrate and seed
```sh
$ npm run db:migrate
$ npm run db:seed
```

Run App

```sh
$ npm run start
```

Run tests

```sh
$ npm test
```

## Endpoints

##### Client

| Endpoint               | HTTP Method | Result                                         |
|------------------------|-------------|------------------------------------------------|
| /clients/signup        | POST        | Register new client or login with existing one |
| /clients/token/refresh | POST        | Refresh JWT token                              |
| /items                 | GET         | Get available items list                       |
| /items[?geo=iso]       | GET         | Get available items by ISO geo location        |
| /items/:id             | GET         | Get item by id                                 |
| /orders                | POST        | Create new order                               |

##### Delivery

| Endpoint                  | HTTP Method | Result                                           |
|---------------------------|-------------|--------------------------------------------------|
| /deliveries               | GET         | Get delivery services list                       |
| /deliveries/:id           | GET         | Get delivery service by id                       |
| /deliveries/:id/locations | POST        | Update available delivery locations              |
| /deliveries/:id/items     | POST        | Update available item types                      |   
| /deliveries/signup        | POST        | Register new delivery or login with existing one |
| /deliveries/token/refresh | POST        | Refresh JWT token                                |
| /orders                   | GET         | Get orders list                                  |
| /orders/:id               | GET         | Get order by id                                  |
