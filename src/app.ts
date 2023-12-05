import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { userRoutes } from './modules/user.route';
const app: Application = express();
//parser
app.use(express.json());
//cors
app.use(cors());
//application route for users
app.use('/api', userRoutes);
app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<h3 align="center" style="color:#333">Advanced CRUD Mastery Server Is Running</h3>',
    );
});

export default app;
