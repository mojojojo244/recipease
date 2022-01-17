const express = require('express');
const mongoose = require('mongoose');

const app = express();

const dbURI =
  'mongodb+srv://jojo:erterbernds@recipease.mna68.mongodb.net/recipease?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('home');
});
