# Express-TS-Mongoose-Starter

A starter project to quickly start developing RESTful APIs using Express, TypeScript, and Mongoose.

## Features

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: Typed superset of JavaScript that compiles to plain JavaScript.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Zod**: TypeScript-first schema declaration and validation library.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [npm](https://www.npmjs.com/) (v6.x or higher) or [yarn](https://yarnpkg.com/) (v1.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/express-ts-mongoose-starter.git
   cd express-ts-mongoose-starter
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/yourdbname
   ```

### Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Build the project:**

   ```bash
   npm run build
   # or
   yarn build
   ```

3. **Run the production server:**

   ```bash
   npm start
   # or
   yarn start
   ```

### Project Structure

```

express-ts-mongoose-starter/
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── services/
│ ├── app.ts
│ └── server.ts
├── tests/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── tslint.json
└── README.md
```

- **`src/`**: Contains the source code for the application.
  - **`controllers/`**: Defines the request handlers.
  - **`models/`**: Mongoose schemas and models.
  - **`routes/`**: Application routes.
  - **`middlewares/`**: Custom Express middlewares.
  - **`services/`**: Business logic and services.
  - **`app.ts`**: Initializes the Express application.
  - **`server.ts`**: Starts the server.

### Scripts

- **`dev`**: Runs the development server with hot-reloading.
- **`start`**: Runs the production server.
- **`prod`**: Alias for `start`.
- **`lint`**: Lints the project using ESLint.
- **`build`**: Compiles TypeScript to JavaScript.
- **`lint:fix`**: Fixes linting errors automatically.
- **`test`**: Placeholder for adding test scripts.

### License

This project is licensed under the ISC License.

### Author

[Mahamudul Hasan](https://github.com/yourusername)
