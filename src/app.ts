import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './modules/user.route';
const app: Application = express();
//parser
app.use(express.json());
//cors
app.use(cors());
//application route for users
app.use('/api/users', UserRoutes);
app.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send(
      '<h3 align="center" style="color:#333">Advanced CRUD Mastery Server Is Running</h3>',
    );
});

app.all('*', (req: Request, res: Response) => {
  res.send({
    success: false,
    message: 'Invalid route',
  });
});

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).send('Something went wrong!');
});

export default app;
