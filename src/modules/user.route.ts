import express from 'express';
import { userController } from './user.controller';

const router = express.Router();
// new user create route
router.post('/users', userController.createUser);

export const userRoutes = router;
