import { Router } from 'express';
import { loginUser, logoutUser } from '../controllers/auth.controller';
import {
	postUser,
	getUser,
	topUpBalance
} from '../controllers/user.controller';
import authenticateToken from '../middlewares/authenticateToken';
import readingRoutes from './reading.routes';

const router = Router();

// Route -> /user/register
router.post('/register', postUser);

// Route -> /user/login
router.post('/login', loginUser);

// Route -> /user/
router.get('/', authenticateToken, getUser);

// Route -> /user/logout
router.post('/logout', logoutUser);

//Route -> /user/topup
router.post('/topup', authenticateToken, topUpBalance);

// Routes -> /user/reading/*
router.use('/reading', authenticateToken, readingRoutes);

export default router;
