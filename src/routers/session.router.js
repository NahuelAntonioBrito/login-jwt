import { Router } from "express";
import passport from "passport";
import { JWT_COOKIE_NAME } from "../utils.js";
const router = Router()

router.post('/register', passport.authenticate('register', {failureRedirect: '/session/failRegister'}), async(req, res) => {
    res.redirect('/')
})

router.get('/failRegister', (req, res) => res.send({ error: 'Passport register Failed'}))

router.post('/login', passport.authenticate('login', {failureRedirect: '/session/failLogin'}), async(req, res) => {
    if(!req.user){
        return res.status(400).send({ status:'error', error:'Invalid credentials'})
    }

    res.cookie(JWT_COOKIE_NAME, req.user.token).redirect('/products');

})

router.get('/failLogin', (req, res) => res.send({ error: 'Passport login Failed'}))

router.get('/logout', (req, res) => {
    req.clearCookie(JWT_COOKIE_NAME).res.redirect('/')

})

router.get('/github', passport.authenticate('github', { scope: ['user: email']}), (reqe, res) => {

})

router.get('/githubcallback', passport.authenticate('github' , { failureRedirect: '/login'}), async( req, res) => {
    console.log('Callback: ', req.user )
    req.session.user = req.user
    res.redirect('/products')
})

export default router