import express from 'express';
import jwt from 'jsonwebtoken';

let router = express.Router();

router.post('/', (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({error: 'Invalid data parameters.'});
    }
    let token = jwt.sign({
        id: 123,
        username: req.body.username,
        role: 'test'
    }, 'very-secret-key');
    return res.status(200).json({
        token: token,
        username: req.body.username,
        password: req.body.password
    });
});

export default router;
