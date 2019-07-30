const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const Role = sequelize.define("Roles", {
    role_id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    role_name: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  });

  Role.associate = models => {
    Role.hasMany(models.Users, {foreignKey: 'role_id'});
    Role.belongsToMany(models.Permissions, {through: models.PermissionDetails, foreignKey: 'role_id'});
  };

  return Role;
};

