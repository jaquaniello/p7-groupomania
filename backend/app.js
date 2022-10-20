const express = require('express');

const app = express();

const mongoose = require('mongoose');


const userRoutes = require('./routes/user')

const postRoutes = require('./controllers/post')

const comsRoutes = require('./routes/Coms')

const path = require("path");





app.use(express.json());



//mongoose.connect('mongodb+srv://Damien:damien94@cluster0.jtcpl.mongodb.net/?retryWrites=true&w=majority',
mongoose.connect('mongodb+srv://Damien:damien94@cluster0.jtcpl.mongodb.net/node-api',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  app.use("/images", express.static(path.join(__dirname, "images")));

  app.use('/auth', userRoutes)
  app.use('/com', comsRoutes)
  app.use('/posts', postRoutes)

module.exports = app;

