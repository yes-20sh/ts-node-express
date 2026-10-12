# Zero-Config TypeScript Express Backend Starter Kit

> A professional, zero-config TypeScript Express backend starter kit with MongoDB integration and ultra-fast hot-reloading powered by **tsx**.

## Features

- **Blazing Fast**: Uses `tsx` with esbuild for instant hot-reloads and zero-config TypeScript execution
- **Type Safety**: Full TypeScript support with strict type checking
- **Database**: MongoDB integration with Mongoose ODM
- **REST API**: Complete CRUD operations for Items and Health checks
- **Error Handling**: Centralized error handling middleware
- **Logging**: HTTP request logging with Morgan
- **Environment Config**: Environment variables management with `dotenv`
- **CORS**: Cross-Origin Resource Sharing enabled

## Quick Start

### 1. Installation

Install the package directly into any project:

```bash
npm install @yes20sh/ts-node-express
```

The postinstall setup will automatically create:
- `/src` (controllers, routes, schemas, middlewares, config)
- `tsconfig.json`
- `.env`
- `.gitignore`
- `.prettierrc`
- `README.md`
- Pre-configured `dev`, `build`, and `start` scripts in your `package.json`

### 2. Configure Environment

Open the generated `.env` file and configure your database and port:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/ts-node-express
```

### 3. Start Development Server

```bash
npm run dev
```

Your server will start with instant hot-reload via `tsx watch src/server.ts`!

## Available Scripts

- `npm run dev` - Starts development server with hot-reload (`tsx watch`)
- `npm run build` - Compiles TypeScript to `dist/` (`tsc`)
- `npm start` - Runs the production build (`node dist/server.js`)
- `npm run lint` - Runs ESLint checks

## API Endpoints

### Health Check
- `GET /api/health` - Check server status and view check count
- `POST /api/health` - Increment / take health count


## Author

**Yashraj Singh Solanki**

## License

MIT