import { Router } from 'express';
import { postHook, getPushes } from './controller';

const router = Router();

router.post('/hook', postHook);
router.get('/pushes', getPushes);

export default router;
