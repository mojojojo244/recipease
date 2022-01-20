const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');

const app = express();

//middleware
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.set('view engine', 'ejs');

//DB connection
const dbURI =
  'mongodb+srv://jojo:erterbernds@recipease.mna68.mongodb.net/recipease?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//Routes
app.get('*', checkUser);
app.post('*', checkUser);
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});
app.use('/recipes', recipeRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
