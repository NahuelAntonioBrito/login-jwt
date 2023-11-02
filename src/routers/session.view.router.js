import { Router } from "express";

import passport from "passport";

const router = Router()

router.get('/', async(req, res) => {
    res.render('sessions/login')
})

router.get('/register', async(req, res) => {
    res.render('sessions/register')
})

router.get('/profile', passport.authenticate('current', { session: false }), async(req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).send("No se pudo autenticar al usuario.");
    }
    console.log(user)
    res.render('sessions/profile',  user );
})

export default router