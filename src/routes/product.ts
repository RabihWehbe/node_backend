import express from 'express';
import controller from '../controllers/product';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';
import { verifyToken } from '../middleware/VerifyToken';

const router = express.Router();

router.post('/create',verifyToken,ValidateSchema(Schemas.product.create), controller.createProduct);
router.get('/:productId',verifyToken,controller.readProduct);
router.get('',verifyToken,controller.readAllProducts);
router.put('/:productId',verifyToken, ValidateSchema(Schemas.product.update), controller.updateProduct);
router.delete('/:productId',verifyToken, controller.deleteProduct);

export = router;