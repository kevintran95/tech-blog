const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');


// Route to add a comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            opinion: req.body.opinion,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        });
        res.render('post', {
            newComment,
        });
    } catch (err) {
        res.status(400).json(err);
    }
});



// Route to allow users to delete their own comments
router.delete('/:id', async (req, res) => {
    try {
        const deleteComment = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
              }
        });
        if (!deleteComment) {
            res.status(404).json({ message: "You don't have authorization to delete this review." });
            return;
        }
        res.status(200).json(deleteComment);
        
    } catch (err) {
        res.status(400).json(err);
    }
})


module.exports = router;