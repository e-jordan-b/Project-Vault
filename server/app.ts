import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/router';

const app: Express = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

export default app;
