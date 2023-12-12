import { Router } from 'express';
import {
  addOrders,
  calculatePrice,
  deleteSingleUser,
  getUsersController,
  getOrdersOfUsers,
  userByIdController,
  updateAUser,
  createUsers,
} from './user.controller';

const router = Router();

router.post('/', createUsers);

router.get('/', getUsersController);

router.get('/:userId', userByIdController);

router.put('/:userId', updateAUser);

router.delete('/:userId', deleteSingleUser);

router.put('/:userId/orders', addOrders);

router.get('/:userId/orders', getOrdersOfUsers);

router.get('/:userId/orders/total-price', calculatePrice);

export const UserRoutes = router;
