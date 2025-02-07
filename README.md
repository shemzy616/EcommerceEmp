
## Project Overview

**Eshop** is a full-stack e-commerce website designed to provide a modern, secure, and user-friendly shopping experience. Built with TypeScript, Express, React, and PostgreSQL, this project offers a robust API for managing products and promotions, along with secure, admin-restricted routes for backend management. The backend uses Express and drizzle-orm to interact with a PostgreSQL database (via Neon serverless), while the frontend is developed using React, Vite, and Wouter for seamless client-side routing.

## Setup Instructions

### Prerequisites

- **Node.js:** Version 14 or higher
- **npm:** Version 6 or higher
- **PostgreSQL Database:** 

### Environment Variables

```env
DATABASE_URL=postgresql://neondb_owner:npg_3ub9SXAwxaIH@ep-lucky-lab-a6xi0h18.us-west-2.aws.neon.tech/neondb?sslmode=require
This connection string is essential for the PostgreSQL database connection.
Dependency Installation Steps
Clone the Repository:
git clone :https://github.com//rest-express.git](https://github.com/shemzy616/EcommerceEmp.git
cd EcommerceEmp
Install Project Dependencies:
npm install
Running Instructions
Development Mode
To run the project in development mode—with hot-reloading and Vite integration for the frontend—execute:
npm run dev
This starts the Express server on port 5000 and integrates Vite for a smooth development experience, including frontend hot-reloading.
Production Mode
To build and run the project in production mode:
Build the Project:
npm run build
Start the Production Server:
npm start
The production build compiles the frontend assets and bundles the backend code, serving the entire application through the Express server.
Project Structure Documentation
Below is an overview of the project's directory structure
EcommerceEmp/
├── client/                   # React frontend source code
│   └── src/
│       ├── components/       # Reusable UI components
│       ├── pages/            # Page components (e.g., Home, Auth, Product Detail, etc.)
│       └── lib/              # Utility functions and context providers (Auth, Cart, Query Client, Protected Routes)
├── server/                   # Express backend source code
│   ├── auth.ts               # Authentication configuration and setup
│   ├── db.ts                 # Database connection and schema verification using drizzle-orm and Neon
│   ├── index.ts              # Express server entry point
│   ├── routes.ts             # API route definitions (Products and Promotions endpoints)
│   └── storage.ts            # Data storage operations interacting with the database
├── shared/                   # Shared schemas and types (e.g., Zod schemas)
├── package.json              # Project metadata, scripts, and dependencies
└── tsconfig.json             # TypeScript configuration
License
This project is licensed under the MIT License.
