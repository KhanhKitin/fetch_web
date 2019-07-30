const Sequelize = require("sequelize");
const sequelize = require("../src/database/connection");

module.exports = () => {
  const Book = sequelize.define("Books", {
    book_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    catalog_id: {
      type: Sequelize.INTEGER(11),
      references: {
        model: "Catalogs",
        key: "catalog_id"
      }
    },
    book_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    author: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    image: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    }
  });

  Book.associate = models => {
    Book.belongsToMany(models.Users, {
      through: models.Loves,
      foreignKey: "book_id",
      otherKey: 'user_id'
    });
    Book.belongsToMany(models.Orders, {
      through: models.OrderDetails,
      foreignKey: "book_id"
    });
    Book.belongsToMany(models.Carts, {
      through: models.CartDetails,
      foreignKey: "book_id"
    });
    Book.belongsToMany(models.Users, {
      through: models.Comments,
      foreignKey: "book_id"
    });
    Book.belongsTo(models.Catalogs, {
      foreignKey: "catalog_id"
    });
  };
  return Book;
};
