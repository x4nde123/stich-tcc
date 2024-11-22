import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import rotas from './rotas.js';

const servidor = express();

servidor.use(cors());
servidor.use(express.json());

servidor.use('/storage/produtos', express.static('storage/produtos'))

rotas(servidor);

servidor.listen(process.env.PORTA, () => console.log(`subiu o BumBum do casca na porta ${process.env.PORTA}`))
