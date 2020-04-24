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
  Choices.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Choices.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Choices;
};
