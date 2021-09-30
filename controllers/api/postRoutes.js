const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


// Route to create a new post
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
        console.log(newPost);
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if (!deletePost) {
            res.status(404).json({ message: "You don't have authorization to delete this post." });
            return;
        }
        res.status(200).json(deletePost);
        
    } catch (err) {
        res.status(400).json(err);
    }
})


module.exports = router;
