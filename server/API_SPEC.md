## API Spec

### Register
Request:
- Method: `POST`
- Endpoint: `/api/register`
- Headers:
    - Content-Type: application/json
    - Accept: application/json
- Body:
    ```json
    {
        "fullname": "string",
        "username": "string",
        "password": "string"
    }
    ```

Success Response:
- Http status code: `201`
- Body:
    ```json
    {
        "data": {
            "id": "integer",
            "fullname": "string",
            "username": "string",
            "createdAt": "date"
        }
    }
    ```

Error Response:
- Http status code: `400`
- Body:
    ```json
    {
        "error": {
            "message": "string"
        }
    }
    ```

### Login
Request:
- Method: `POST`
- Endpoint: `/api/login`
- Headers:
    - Content-Type: application/json
    - Accept: application/json
- Body:
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```

Success Response:
- Http status code: `200`
- Body:
    ```json
    {
        "data": {
            "fullname": "string",
            "token": "string"
        }
    }
    ```

Error Response:
- Http status code: `400`
- Body:
    ```json
    {
        "error": {
            "message": "string"
        }
    }
    ```

### Create Todo
Request:
- Method: `POST`
- Endpoint: `/api/todos`
- Headers:
    - Authorization: Bearer \<token>
    - Content-Type: application/json
    - Accept: application/json
- Body:
    ```json
    {
        "todo": "string"
    }
    ```

Success Response:
- Http status code: `201`
- Body:
    ```json
    {
        "data": {
            "todo": {
                "id": "integer",
                "todo": "string",
                "isdone": "boolean",
                "createdAt": "date",
                "updatedAt": "date"
            },
        }
    }
    ```

Error Response:
- Http status code: `400`
- Body:
    ```json
    {
        "error": {
            "message": "string"
        }
    }
    ```

### List Todos
Request:
- Method: `GET`
- Endpoint: `/api/todos`
- Headers:
    - Authorization: Bearer \<token>
    - Accept: application/json

Success Response:
- Http status code: `200`
- Body:
    ```json
    {
        "data": {
            "todos": [
                {
                    "id": "integer",
                    "todo": "string",
                    "isdone": "boolean",
                    "createdAt": "date",
                    "updatedAt": "date"
                }
            ]
        }
    }
    ```

Error Response:
- Http status code: `400`
- Body:
    ```json
    {
        "error": {
            "message": "string"
        }
    }
    ```

### Get Todo
Request:
- Method: `GET`
- Endpoint: `/api/todos/{id_todo}`
- Headers:
    - Authorization: Bearer \<token>
    - Accept: application/json

Success Response:
- Http status code: `200`
- Body:
    ```json
    {
        "data": {
            "todo": {
                "id": "integer",
                "todo": "string",
                "isdone": "boolean",
                "createdAt": "date",
                "updatedAt": "date"
            }
        }
    }
    ```

Error Response:
- Http status code: `400`
- Body:
    ```json
    {
        "error": {
            "message": "string"
        }
    }
    ```

### Update Todo
Request:
- Method: `PATCH`
- Endpoint: `/api/todos/{id_todo}`
- Headers:
    - Authorization: Bearer \<token>
    - Accept: application/json

Success Response:
- Http status code: `200`
- Body:
    ```json
    {
        "data": {
            "todo": {
                "id": "integer",
                "todo": "string",
                "isdone": "boolean",
                "createdAt": "date",
                "updatedAt": "date"
            }
        }
    }
    ```

Error Response:
- Http status code: `400`
- Body:
    ```json
    {
        "error": {
            "message": "string"
        }
    }
    ```

### Delete Todo
Request:
- Method: `DELETE`
- Endpoint: `/api/todos/{id_todo}`
- Headers:
    - Authorization: Bearer \<token>
    - Accept: application/json

Success Response:
- Http status code: `200`
- Body:
    ```json
    {
        "data": {
        "message": "string"
        }
    }
    ```

Error Response:
- Http status code: `400`
- Body:
    ```json
    {
        "error": {
            "message": "string"
        }
    }
    ```
