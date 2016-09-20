import express from 'express';
import login from './login.js';
import showcase from './showcase.js';

let router = express.Router();

router.use('/login', login);
router.use('/', showcase);

export default router;
