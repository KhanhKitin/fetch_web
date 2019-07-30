const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const Permission = sequelize.define("Permissions", {
    permission_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    type_permission: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  });

  Permission.associate = models => {
    Permission.belongsToMany(models.Roles, {through: models.PermissionDetails,  foreignKey: 'Permission_id'});
  };

  return Permission;
};

