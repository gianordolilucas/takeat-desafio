import dotenv from 'dotenv';
import { setupSwagger } from './config/swagger';
import { sequelize } from './database/models';
import { AddressInfo } from 'net';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 0;

async function startServer() {
  try {
    //Verify if the database is connected
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Initialize the Swagger documentation
    setupSwagger(app);
    
    // Mount the routes on port
    const server = app.listen(PORT, () => {
      const address = server.address();
      if (typeof address !== 'string' && address !== null) {
        const assignedPort = (address as AddressInfo).port;
        console.log(`Server running on port ${assignedPort}`);
        console.log(`Swagger docs available at http://localhost:${assignedPort}/api-docs`);
      } else {
        console.error('Could not retrieve the server address');
      }
    });
    return server;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

// Start the server
startServer();

export { startServer };
