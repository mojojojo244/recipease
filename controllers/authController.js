const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  let errors = { username: '', password: '' };
  if (err.code === 11000) {
    errors.username =
      'That username already exists; Please log in or choose a new username';
    return errors;
  }

  if (err.message.includes('user validation')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'jc secret', {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.render('signup', { title: 'Sign Up' });
};
module.exports.login_get = (req, res) => {
  res.render('login', { title: 'Login' });
};
module.exports.signup_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  res.send('user login');
};
