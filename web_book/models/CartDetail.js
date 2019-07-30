const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const CartDetail = sequelize.define("CartDetails", {
    cart_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Carts",
        key: "cart_id"
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
    quantity: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  });
  return CartDetail;
};
