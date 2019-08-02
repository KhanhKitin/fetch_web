const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const Comment = sequelize.define("Comments", {
    comment_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER(11),
      references: {
        model: "Users",
        key: "user_id"
      }
    },
    book_id: {
      type: Sequelize.INTEGER(11),
      references: {
        model: "Books",
        key: "book_id"
      }
    },
    content: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    date_create: {
      type: Sequelize.DATE,
      allowNull: false
    },
    status: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  });

  Comment.associate = models => {
    Comment.belongsTo(models.Books, {foreignKey:'book_id'});
    Comment.belongsTo(models.Users, {foreignKey:'user_id'});
  };
 

  return Comment;
};

