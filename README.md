# Symfony React Todo List Application

This project is a simple Todo List application built using Symfony and React. This project also uses Webpack Encore for asset management and Material-UI for a sleek, modern user interface.

## Features

- **Symfony 6**: Modern PHP framework for building web applications.
- **React**: JavaScript library for building user interfaces.
- **Webpack Encore**: Simplifies working with CSS and JavaScript.
- **Material-UI**: Popular React UI framework for a more intuitive and responsive design.
- **SQLite**: Uses SQLite for an easy-to-setup database solution.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- PHP 7.4 or higher
- Composer: Dependency Manager for PHP
- Node.js and npm: For managing React and other JavaScript libraries
- Symfony CLI: For running the Symfony application

## Installation

To set up the project environment, follow these steps:

1. **Use Makefile to Install Dependencies**
   Run the `make install` command to install PHP and JavaScript dependencies.
   ```bash
   make install
   ```

   This command will execute:
    - `composer install`: Installs all the PHP dependencies required for the project.
    - `npm install`: Installs all the Node modules needed for React and Webpack Encore.

## Database Setup

To configure the database for the application, use the provided Makefile:

1. **Create and Migrate Database**
   ```bash
   make remake
   ```

   This command will perform the following actions:
    - `php bin/console doctrine:database:create`: Creates the database.
    - `php bin/console doctrine:migrations:migrate`: Applies migrations to the database to set up the required tables.

## Running the Application

After installing the dependencies and setting up the database, you can start the application using Symfony's built-in server:

1. **Start the Symfony Server**
   ```bash
   symfony server:start
   ```

2. **Build Assets with Webpack Encore**
   To compile your JavaScript and CSS files, run:
   ```bash
   npm run dev
   ```

   Use `npm run watch` to automatically recompile assets when files change.

## Usage

Navigate to `http://localhost:8000` in your web browser to view the Todo List application. You can add, delete, and edit your todos interactively.