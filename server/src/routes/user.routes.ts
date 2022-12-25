import { Router } from 'express';
import { loginUser, logoutUser } from '../controllers/auth.controller';
import { postUser, getUsers } from '../controllers/user.controller';
import readingRoutes from './reading.routes';

const router = Router();

router.post('/register', postUser);

router.post('/login', loginUser);

router.get('/', getUsers);

router.post('/logout', logoutUser);

router.use('/reading', readingRoutes);

export default router;
