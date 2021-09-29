const router = router('express').Router();
const { Post, User, Comment } = require('../models');
// const withAuth = require('')

// GET route for homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn
    });
    res.status(200);
  } catch(err) {
    res.status(500).json(err)
  }
});

// GET route for login
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch {
    res.status(500).json(err)
  }
});

// GET route to access dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const postData = await Post.findAll();
    const post = postData.map((post) => post.get({ plain: true}));

    res.render('dashboard', {
      post, 
      loggedIn: req.session.loggedIn
    });
  } catch {
    res.status(500).json(err);
  }
})


module.exports = router;