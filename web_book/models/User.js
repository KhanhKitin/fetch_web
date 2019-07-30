const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');


module.exports = () => {
  const User = sequelize.define("Users", {
    user_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role_id: {
      type: Sequelize.INTEGER(11),
      references: {
        model: "Roles",
        key: "role_id"
      }
    },
    username: {
      type: Sequelize.STRING(35),
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(35),
      allowNull: false,
      validate: {
        isEmail: true
      }
    }
  });

  User.associate = models => {
    
    User.belongsToMany(models.Books, { through: models.Loves, foreignKey: 'user_id', otherKey: 'book_id'});
    User.belongsToMany(models.Books, { through: models.Comments, foreignKey: 'user_id' });
  };

  return User;
};



