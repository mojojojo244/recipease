const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middleware/authMiddleware');
const methodOverride = require('method-override');
require('dotenv').config({ path: './config.env' });

const app = express();

//middleware
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.set('view engine', 'ejs');

//DB connection
const dbURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.log(err));

//Routes
app.get('*', checkUser);
app.post('*', checkUser);
app.put('*', checkUser);
app.get('/', (req, res) => {
  res.redirect('/recipes');
});
app.use('/recipes', recipeRoutes);
app.use(authRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
