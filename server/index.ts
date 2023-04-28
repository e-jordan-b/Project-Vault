import app from './app';
import { connectToDB } from './db';

(async () => {
  await connectToDB();
  app.listen(3001, () => {
    console.log('listening on http://localhost:3001');
  });
})();
