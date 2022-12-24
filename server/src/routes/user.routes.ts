import { Router } from 'express';
import { loginUser, logoutUser } from '../controllers/auth.controller';
import { postUser, getUsers } from '../controllers/user.controller';

const router = Router();

router.post('/register', postUser);

router.post('/login', loginUser);

router.get('/', getUsers);

router.post('/logout', logoutUser);

export default router;
