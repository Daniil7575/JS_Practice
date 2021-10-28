const Sequelize = require("sequelize");
const { sequelize } = require('..');

class Todo extends Sequelize.Model {}

Todo.init(
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.DataTypes.UUIDV4
        },
        title: {
            type: Sequelize.STRING,
            defaultValue: "Title",
        },
        description:{
            type: Sequelize.STRING,
            defaultValue: "Description"
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    },
    { sequelize: sequelize, underscored: true, modelName: 'todo' }
);

module.exports = Todo
