const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit")

const userCtrl = require('../controllers/user');
const passwordCheck = require("../middlewares/password-validator");


//Limiter le nombre d'interactions avec l'API pour le LogIn
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limite de 5 requêtes pour la duré prévue (ici, 15 minutes)
    standardHeaders: true,
    legacyHeaders: false,
    message: "Vous avez dépassé la limite de 5 tentatives de connection chaque 15 minutes!",
});

//Limiter le nombre d'interactions avec l'API pour la création de compte
const createAccountLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 5, // Limite de 5 requêtes pour la duré prévue (ici, 60 minutes)
    standardHeaders: true,
    legacyHeaders: false,
    message: "Vous avez dépassé la limite de 5 créations de compte chaque 60 minutes!",
});


router.post('/signup', passwordCheck, createAccountLimiter, userCtrl.signup);
router.post('/login', loginLimiter, userCtrl.login);

module.exports = router;