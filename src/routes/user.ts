import express from 'express';
import controller from '../controllers/user';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import { verifyToken } from '../middleware/VerifyToken';

const router = express.Router();

router.get('/protected',verifyToken,controller.protectedRoute);

router.post('/login',controller.loginUser);

router.post('/signup',ValidateSchema(Schemas.user.create),controller.signUpUser);

export = router;