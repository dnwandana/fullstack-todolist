# Server-side Todolist

## API Spec

Read more at [API_SPEC.md](API_SPEC.md)

## Project Setup

### Database Setting

This project uses PostgreSQL as the main database, you can change to [MySQL, SQLite, or SQL Server](https://www.prisma.io/docs/concepts/database-connectors).

### Import Tables

1. **Login PostgreSQL**

    ```bash
    psql -U username -d postgres -W
    ```

2. **Create Database**

    ```bash
    CREATE DATABASE prisma_todolist;
    ```

3. **Connect to The Database**

    ```bash
    \c prisma_todolist;
    ```

4. **Import `prisma/schema.sql`**

    ```bash
    \i 'prisma/schema.sql'
    ```

### Install Depedencies

```bash
yarn install
```

### Setup Environment Variables

- DATABASE_URL
- TOKEN_SECRET
- TOKEN_LIFE

for example, you can see [`.env.example`](.env.example)

### Introspect Database with Prisma

```bash
yarn prisma introspect
```

> This commands reads the DATABASE_URL environment variable that's defined in .env and connects to your database. Once the connection is established, it introspects the database (i.e. it reads the database schema). It then translates the database schema from SQL into a Prisma data model.

Read More: [Introspect your database with Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-node-postgres#introspect-your-database-with-prisma)

### Generate Prisma Client

```bash
yarn prisma generate
```
> This command reads your Prisma schema and generates your Prisma Client library into `node_modules/@prisma/client`.

Read More: [Install and generate Prisma Client](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project-node-postgres#install-and-generate-prisma-client)

### Compiles and Hot-reloads for Development

```bash
yarn dev
```

### Build and Run

1. **Compiles Source Code**
  
    ```bash
    yarn build
    ```

2. **Run the Application**

    ```bash
    yarn start
    ```