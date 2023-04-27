import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/router';

const app: Express = express();
const port = 3001;

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log('listening on http://localhost:3001')
})
