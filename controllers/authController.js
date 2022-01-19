const User = require('../models/User');

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
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  res.send('user login');
};
