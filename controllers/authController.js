const User = require('../models/User');

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
    console.log(err);
    res.status(400).send('error, user not created');
  }
};
module.exports.login_post = async (req, res) => {
  const { username, password } = req.body;
  res.send('user login');
};
