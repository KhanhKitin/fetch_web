const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const OrderDetail = sequelize.define("OrderDetails", {
    order_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Orders",
        key: "order_id"
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

  OrderDetail.associate = models => {
    OrderDetail.belongsTo(models.Orders, {foreignKey: 'order_id'});
  };
  
  return OrderDetail;
};
