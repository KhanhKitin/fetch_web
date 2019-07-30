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
  
 
  return Love;
};
