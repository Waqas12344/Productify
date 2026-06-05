import {Router} from 'express';
import { requireAuth } from '@clerk/express';
import { createComment ,  deleteComment } from "../controllers/commnetController";
const router = Router();

router.post('/:productId', requireAuth(), createComment);
router.delete('/:commentId', requireAuth(), deleteComment);

export default router;