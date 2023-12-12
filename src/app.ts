import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user.router';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(
      '<h3 align="center" style="color:#333">Advanced CRUD Mastery Server Is Running</h3>',
    );
  } catch (error) {
    next(error);
  }
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