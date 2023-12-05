import cors from 'cors';
import express, { Application, Request, Response } from 'express';
const app: Application = express();
//parser
app.use(express.json());
//cors
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send('<h3 align="center">Advanced CRUD Mastery Server Is Running</h3>');
});

export default app;
