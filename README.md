# CinemaRoll

[Live website](https://cinema-roll-backup.herokuapp.com/)

This website is a clone of [goodreads.com](goodreads.com), but for movies.


# Main features

- Users can register for accounts and log into the website
- Users can create / delete / edit reading lists and assign movies to them
- Users can see top 15 most popular movies on the main page
- Users can search movies by movie title
- Users can view individual movie details
- Users can write / edit / delete reviews to movies

# Design Docs & Database Schema

Can be viewed in the [Project Wiki](https://github.com/davidvous/cinemaRoll/wiki).

# Deployment Instructions & Requirements

- Requires a `Postgres` installations
- Run the following commands
	```
	git clone https://github.com/davidvous/cinemaRoll
	cd cinemaRoll
	npm install
	nmp start
	```
- Make sure to create & populate the `.env` file following the example given in `.env.example`. 

# Tech Uses

- Express backend with Pug templates
- Vanilla JS / CSS on the frontend

# Code Snippets

```javascript
'use strict';

module.exports = (sequelize, DataTypes) => {
	const MovieList = sequelize.define('MovieList',
		{
		name: { type: DataTypes.STRING(50),
			allowNull: false},
			userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	MovieList.associate = function(models) {
		MovieList.belongsTo(models.User, {foreignKey:'userId'})
		const columnMapping = {
			through: 'ListToMoviesJoinTable',
			otherKey: 'movieId',
			foreignKey: 'movieListId'
		}
		MovieList.belongsToMany(models.Movie, columnMapping);
	};
return MovieList;
};
```

# Screen shots

- Main page
![enter image description here](http://i.imgur.com/AtvJyYI.png)

- Watch list page
![enter image description here](http://i.imgur.com/oxWlzpP.png)

- Movie page
![enter image description here](http://i.imgur.com/P2VemzC.png)
