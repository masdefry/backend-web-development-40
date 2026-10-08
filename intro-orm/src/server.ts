import express from 'express';
import { authorsRoute } from './routes/authors.route';

const PORT: number = 8000;

const app = express();

// Body Parser
app.use(express.json());

app.use('/api/v1/authors', authorsRoute); 

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
