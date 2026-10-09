import express from 'express';
import { authorsRoute } from './routes/authors.route';
import 'dotenv/config';
import { BooksRoute } from './features/books/books.route';

const PORT: number = parseInt(process.env.PORT!);
const API_PREFIX: string = process.env.API_PREFIX!;
const app = express();

app.use(express.json());

app.use(`${API_PREFIX}/authors`, authorsRoute);
app.use(`${API_PREFIX}/books`, BooksRoute);

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
