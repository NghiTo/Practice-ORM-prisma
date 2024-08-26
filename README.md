# Project Setup Guide

## Introduction

This project is designed to help you quickly get up and running. Follow the steps below to configure your environment and start the project.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)
- MySQL

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repository/project-name.git
   cd project-name
   ```

2. **Install dependencies:**

   Install the required npm packages by running:

   ```bash
   npm install
   ```

## Configuration

1. **Environment Variables:**

   The project uses a `.env` file to manage environment-specific configurations. You need to create or update this file with the appropriate settings.

   **Steps:**

   - Open the `.env` file in environments folder:

   - Update the following variables in the `.env` file as needed:

     ```
     PORT=3000
     DATABASE_URL="mysql://your-mysql-username:your-password@localhost:3306/your-database-name"
     JWT_SECRET=your-secret-key
     MONGODB_URL="mongodb+srv://your-mongodb-username:your-mongodb-password@cluster0.rwucb.mongodb.net/"
     MONGODB_USER=your-mongodb-username
     MONGODB_PASS=your-mongodb-password
     MONGODB_NAME="your-database-name"
     ```

   - Make sure to replace `your-mysql-username`, `your-password`, `your-database-name`, and `your-secret-key` with your actual MySQL credentials, database name, and a secure secret key for JWT.

2. **Database Setup:**

- Ensure your MySQL server is running and create a database that matches the `DATABASE_URL` specified in your `.env` file.

- Run migrations and generate Prisma client to set up your database schema, there are some seeding data in folder prisma/seed.js:

  ```bash
  npm run migrate
  ```

## Running the Project

Once you have configured everything, you can start the project by running:

```bash
npm start
```
