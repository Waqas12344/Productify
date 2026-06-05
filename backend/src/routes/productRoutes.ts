import { Router } from 'express';
 import { requireAuth } from '@clerk/express';
import { getAllProducts, getMyProducts, getProductById, createProduct ,updateProduct,deleteProduct} from '../controllers/productController';
const router = Router();

// product routes
// GET /api/products - Get all products
router.get('/', getAllProducts);

// GET /api/products/:id - Get a product by ID
router.get('/:id', getProductById);

// GET /api/products/my - Get products created by the authenticated user
router.get('/my', requireAuth(), getMyProducts);

// POST /api/products - Create a new product
router.post('/', requireAuth(),createProduct);

// PUT /api/products/:id - Update a product by ID
router.put('/:id', requireAuth(), updateProduct);

// DELETE /api/products/:id - Delete a product by ID
router.delete('/:id', requireAuth(), deleteProduct); 

export default router;