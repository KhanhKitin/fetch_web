const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const Love = sequelize.define("Loves", {
    user_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Users",
        key: "user_id"
       }
    },
    book_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Books",
        key: "book_id"
       }
    },
  });
  
  Love.associate = models => {
    Love.belongsTo(models.Books, {foreignKey:'book_id'});
    Love.belongsTo(models.Users, {foreignKey:'user_id'});
  };
 
  return Love;
};
