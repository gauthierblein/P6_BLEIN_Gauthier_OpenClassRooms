const express = require('express');
const helmet = require("helmet");
const bodyParser = require ('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const auth = require('../back/middlewares/auth');

const userRoutes = require("./routes/user");
const sauceRoutes = require("../back/routes/sauce");

//Protection contre les attaques XSS
const xss = require ('xss-clean')

//Protection contre les attaques noSQL (injections)
const mongoSanitize = require ('express-mongo-sanitize')


const app = express();
//Utilisation du package de sécurité Helmet
app.use(helmet({ crossOriginResourcePolicy: false, }))




// connexion to mongoDB
mongoose.connect('mongodb+srv://gauthierblein:Nina2016@cluster0.f0lmxbl.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Ajout de CORS aux headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use (bodyParser.json());
app.use (mongoSanitize());
app.use (xss());
app.use(express.json());


app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
