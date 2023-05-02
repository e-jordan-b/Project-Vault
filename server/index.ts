import app from './app';
import connectToDB from './db';


const PORT = 3001;
(() => {
  connectToDB();
  app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
  });
})();
