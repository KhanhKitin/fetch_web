const Sequelize = require("sequelize");
const sequelize = require('../src/database/connection');

module.exports = () => {
  const PermissionDetail = sequelize.define("PermissionDetails", {
    role_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Roles",
        key: "role_id"
      }
    },
    permission_id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      references: {
        model: "Permissions",
        key: "permission_id"
      }
    }
  });
 
  return PermissionDetail;
};

