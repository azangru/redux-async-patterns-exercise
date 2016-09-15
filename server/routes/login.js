import express from 'express';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({error: 'Invalid data parameters.'});
    }
    let token = jwt.sign({
        id: 123,
        firstName: 'John',
        lastName: 'Smith',
        role: 'test'
    }, 'very-secret-key');
    return res.status(200).json({token: token});
});

export default router;
