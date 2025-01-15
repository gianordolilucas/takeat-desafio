"use strict";
// import { Sequelize } from 'sequelize';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// export default async function globalSetup() {
//   require('dotenv').config();
//   // Aqui você pode fazer algo como configurar uma conexão de banco de dados
//   console.log("Configuração global inicializada...");
//   // Exemplo de conexão com banco de dados (Sequelize)
//   const sequelize = new Sequelize(
//     process.env.DB_NAME!,
//     process.env.DB_USER!,
//     process.env.DB_PASSWORD!,
//     {
//       host: process.env.DB_HOST,
//       dialect: 'postgres',
//       logging: false, // Desativa logs do Sequelize
//     }
//   );
//   // Aqui você pode inicializar o banco, ou algo mais necessário
//   await sequelize.authenticate();
//   console.log("Banco de dados autenticado com sucesso.");
// }
const child_process_1 = require("child_process");
const sequelize_1 = require("sequelize");
require('dotenv').config();
const runMigrations = () => {
    console.log('Rodando as migrations para o ambiente de teste...');
    (0, child_process_1.execSync)('npx sequelize-cli db:migrate --env test', { stdio: 'inherit' });
};
const globalSetup = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Configurando o banco de dados de teste...');
    const sequelize = new sequelize_1.Sequelize(process.env.DB_TEST_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    });
    // Rodar as migrations para garantir que o banco está pronto
    yield sequelize.authenticate();
    console.log('Banco de dados autenticado com sucesso!');
    runMigrations(); // Rodando as migrations
    yield sequelize.close(); // Fechar a conexão após a execução das migrations
});
exports.default = globalSetup;
globalSetup();
//# sourceMappingURL=globalSetup.js.map