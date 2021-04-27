import { Router } from 'express';
import { postHook } from './controller';

const router = Router();

router.post('/hook', postHook);

export default router;
