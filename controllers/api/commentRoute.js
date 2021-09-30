const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET route to comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create ({
      
    })
  }
 
})




module.exports = router;