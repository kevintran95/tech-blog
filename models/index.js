const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Each post can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// One user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Each comment can only belong to one post 
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// One post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Each comment can only belong to one User 
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// One user can have many posts
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});





module.exports = { User, Post, Comment }; 