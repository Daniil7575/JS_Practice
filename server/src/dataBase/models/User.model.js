const Sequelize = require("sequelize");
const { sequelize } = require('..');
const ToDo = require("./ToDo.model");
const Token = require("./Token.model");


class User extends Sequelize.Model {}

User.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },

        login: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },

        password: {
            type: Sequelize.STRING(50),
            allowNull: false
        },

        email:{
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },

        name: {
            type: Sequelize.STRING,
            defaultValue: "name"
        },
    },
    { sequelize: sequelize, underscored: true, modelName: 'user', timestamps: false }
);

ToDo.belongsTo(User, {foreignKey: "userId"});
Token.belongsTo(User, {foreignKey: "userId"});

User.hasMany(ToDo);
User.hasMany(Token);

module.exports = User
