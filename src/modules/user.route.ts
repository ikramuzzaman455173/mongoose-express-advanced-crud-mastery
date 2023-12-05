import express from 'express';
import { userController } from './user.controller';

const router = express.Router();
// new user create route
router.post('/users', userController.createUser);
// get all users route
router.get('/users',userController.getAllUsers);

export const userRoutes = router;
