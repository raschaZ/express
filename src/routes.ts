import express from 'express';
import AuthController from './controllers/authController';
import { authMiddleware } from './middlewares/authenticate';
import  ForgotPasswordController  from './controllers/forgotPasswordController';
import  ResetPasswordController  from './controllers/resetPasswordController';
import taskController from './controllers/taskController';

const router = express.Router();
//auth
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', authMiddleware, AuthController.logout);
//rest password
router.post('/forgot-password', ForgotPasswordController.initiatePasswordReset);
router.post('/reset-password/:token', ResetPasswordController.sendResetEmail);
//task  
router.post('/tasks',authMiddleware,taskController.createTask);
router.put('/tasks/:id/complete',authMiddleware,taskController.completeTask);
router.delete('/tasks/:id',authMiddleware,taskController.deleteTask);
router.get('/tasks',authMiddleware,taskController.indexTask);

export default router;
