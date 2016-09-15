import express from 'express';
import login from './login.js';

let router = express.Router();

router.use('/login', login);

router.get('/', (req, res) => {
  res.json({message: 'hello?'});
});

export default router;
