export default (sequelize, Sequelize) => {
  return sequelize.define("refreshToken", {
    token: { 
      type: Sequelize.STRING(500), 
      allowNull: false 
    },
    userId: { 
      type: Sequelize.INTEGER, 
      allowNull: false 
    },
    expiresAt: { 
      type: Sequelize.DATE, 
      allowNull: false 
    }
  });
};