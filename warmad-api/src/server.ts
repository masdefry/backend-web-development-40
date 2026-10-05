import express from 'express';
import pool from './configs/pool-connection.config';
import { productsRoute } from './routes/products.route';

const PORT: number = 8000;

const app = express();

// Body Parser
app.use(express.json());

app.use('/api/v1', productsRoute); 

pool.connect((err, client, release) => {
  if (err) return console.log(`Error acquiring client ${err.stack}`);

  console.log('Connection successful');

  release();
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
