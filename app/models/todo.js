module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define("Todo", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
    return Todo;
  };
  