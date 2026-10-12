import { Router } from 'express';
import { getHealth, takeHealthCount } from '../controllers/healthController';

const router = Router();

// GET
router.get('/', getHealth);

// POST
router.post('/', takeHealthCount);
router.post('/count', takeHealthCount);

export default router;
