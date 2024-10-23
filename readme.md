
# AKASIA Assesment Test Server



Node Typescript Server Documentation for AKASIA Assesment Test





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`SECRET`
`PORT`


# Installation

Install Server with npm

```bash
  npm install
```

Run on Development Environtment
```bash
  npm run dev
```

Run on Production Environtment
```bash
  npm run build
  npm run start
```
    
# API Reference

## USER ENDPOINT

### REGISTER
#### Register an account to access the web.

```http
  POST /user/register
```

### Request Body

```javascript
{
  username: string
  firstName: string
  lastName: string
  password: string
  verifyPassword: string
}
```

### LOGIN
#### Login to access the web.

```http
  POST /user/login
```

### Request Body

```javascript
{
  username: string
  password: string
}
```

## TO DO LIST

| Authorization | Type     | Description              |
| :-------- | :------- | :--------------------------- |
| `Bearer` | `string` | **Required**. Your User Token |

### Get all Todo List
#### Get All Todo List belong to User

```http
  GET /todo
```

#### Edit Mark

```http
  PATCH /todo/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to Edit  |

### Request Body

```javascript
{
  status: string
}
```


#### Edit Unmarked Todo

```http
  PUT /todo/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of item to Edit  |


### Request Body

```javascript
{
  subject: string
  description: string
}
```

#### Delete Unmarked Todo

```http
  DELETE /todo/:id
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `id`      | `number` | **Required**. Id of item to Delete  |
