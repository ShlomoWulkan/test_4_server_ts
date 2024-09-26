import express, { Express } from 'express';
import dotenv from 'dotenv';
import beeperController from './src/contrellers/beeperController';

dotenv.config();

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3001');

app.use(express.json());
app.use('/api/beepers', beeperController);

app.listen(port, (): void => console.log(`Server running on port ${port}`));
