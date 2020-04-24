module.exports = function(sequelize, DataTypes) {
  var Choices = sequelize.define("Choices", {
    temptation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discipline: {
      type: DataTypes.STRING,
      allowNull: false
    },
    choice: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });
  return Choices;
};
