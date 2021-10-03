const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

// GET route for all post on homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{
        model: User
      }]
    });
    const posts = postData.map((posts) => posts.get({ plain: true }));

    // res.render('homepage', {
    //   posts,
    //   loggedIn: req.session.loggedIn
    // });

    res.status(200);
  }catch (err) {
    res.status(500).json(err)
  }
});

// GET route for single post on homepage
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.param.id, {
      include: [
        {
          model: User
        },
        {
          model: Comment
        },
      ]
    });
    const posts = postData.get ({ plain: true });

    res.render('post', {
      posts, 
      loggedIn: req.session.loggedIn
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// GET route for home page
router.get('/home', async (req, res) => {
  try {
    res.render('startpage')
  } catch (err) {
    res.status(500).json(err)
  }
});


// GET route for login
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;