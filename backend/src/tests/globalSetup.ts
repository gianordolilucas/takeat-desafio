import { execSync } from 'child_process';
import { Sequelize } from 'sequelize';


require('dotenv').config();

const runMigrations = () => {
  console.log('Rodando as migrations para o ambiente de teste...');
  execSync('npx sequelize-cli db:migrate --env test', { stdio: 'inherit' });
};

const globalSetup = async () => {
  console.log('Configurando o banco de dados de teste...');
  const sequelize = new Sequelize(
    process.env.DB_TEST_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!,
    {
      host: process.env.DB_HOST,
      dialect: 'postgres',
      logging: false,
    }
  );

  // Rodar as migrations para garantir que o banco está pronto
  await sequelize.authenticate();
  console.log('Banco de dados autenticado com sucesso!');
  runMigrations(); // Rodando as migrations

  await sequelize.close(); // Fechar a conexão após a execução das migrations
};

export default globalSetup;

globalSetup();