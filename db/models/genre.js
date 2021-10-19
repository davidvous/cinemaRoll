'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre',{
      name: {
        type: DataTypes.STRING(75),
        allowNull: false,
        unique: true
      },
    }, {});
  Genre.associate = function(models) {
    // associations can be defined here

    const columnMapping = {
      through: 'MoviesToGenresJoinTables',
      otherKey: 'movieId',
      foreignKey: 'genreId'
    }
    Genre.belongsToMany(models.Movie, columnMapping);

  };
  return Genre;
};
