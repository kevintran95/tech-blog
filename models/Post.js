const  { Model, Datatypes }= require('sequelize');
const sequelize = require('../config/connection');

class blogPost extends Model {}

blogPost.init (
    {
        id: {
            type: Datatypes.INTEGER;
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
    }
)
