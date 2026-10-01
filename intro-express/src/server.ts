import express, { Request, Response } from 'express';

const PORT: number = 8000;

const app = express();

// Body Parser
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  // 1. Body
  // 2. URL   : Params & Query
  // 3. Headers

  return res.json({
    message: 'Welcome to API Intro Express',
  });
});

app.post('/handle-request/:slug', (req: Request, res: Response) => {
  const data = req.body;
  const params = req.params; 
  console.log(params?.slug); 
  const queries = req.query
  console.log(queries?.sort); 

  return res.json({
    message: 'Handle request successful',
  });
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
