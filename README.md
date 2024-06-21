# About

Small to-do list application using React and TypeScript for frontend + PHP and MySQL for backend.

# Building and running

To build and run the application, you need:

-   Node.js 20 or later
-   PHP 8.1 or later
-   MySQL 8.0 or later

## Building and running client

Begin by installing dependencies:

```sh
cd client
npm i
```

Afterwards, you may choose one of the following configurations:

-   Production

    ```sh
    npm run build
    npm run preview
    ```

-   Development
    ```sh
    npm run dev
    ```

Open the given link in your browser of choice.

# Database

Import the `tables.sql` file inside `server/db` directory to create the database and tables.
