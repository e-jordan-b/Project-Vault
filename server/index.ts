import express, { Express } from 'express';
import cors from 'cors';
import router from './routes/router';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(router);

console.log(
  JSON.stringify({
    title: 'string',
    description: 'string',
    image: 'string',
    updates: 'string',
    author: 'string',
    createdBy: 'string',
    date: 'string',
    chat: [],
    tags: 'string string',
    followers: [],
  })
);

app.listen(port, () => {
  console.log('listening on http://localhost:3001');
});

export default app;