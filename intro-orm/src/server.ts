import express from 'express';

const PORT: number = 8000;

const app = express();

// Body Parser
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
