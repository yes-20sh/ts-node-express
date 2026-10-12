import app from './app';
import config from './config/config';
import connectDatabase from './config/databaseConfig';

const startServer = async (): Promise<void> => {
  await connectDatabase();

  app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
    console.log(`Health check at http://localhost:${config.port}/api/health`);
  });
};

startServer();

