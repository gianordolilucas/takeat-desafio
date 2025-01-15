import express from 'express';
import cors from 'cors';
import routes from './api/routes';

const app = express();

const corsOptions = {
  origin: '*', // Permitir todas as origens (para teste)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use('/', routes);

export default app;
