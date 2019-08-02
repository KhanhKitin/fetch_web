const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const Cart = sequelize.define("Carts", {
    cart_id: {
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
    date_create: {
      type: Sequelize.DATE,
      allowNull: false
    },
    total_amount: {
      type: Sequelize.FLOAT,
      allowNull: false
    }
  });

  Cart.associate = models => {
    Cart.belongsTo(models.Users, { foreignKey: 'user_id'});
    Cart.belongsToMany(models.Books, {through: models.CartDetails,  foreignKey: 'cart_id'});
    Cart.hasMany(models.CartDetails, {foreignKey: 'cart_id'})
  }

  return Cart;
}

