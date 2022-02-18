# CinemaRoll

[Live website](http://cinema-roll.herokuapp.com/)

This website is a clone of [goodreads.com](goodreads.com), but for movies.


# Main features

- Users can register for accounts and log into the website
- Users can create / delete / edit reading lists and assign movies to them
- Users can see top 15 most popular movies on the main page
- Users can search movies by movie title
- Users can view individual movie details
- Users can write / edit / delete reviews to movies

# Design Docs & Database Schema

Can be viewed in the [Project Wiki](https://github.com/jas0123uah/cinemaRoll).

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

## Technologies Used
Cinemaroll features an Express backend that uses the ORM Sequelize. The database is made with PostgreSQL. 

Pug templates are used on the frontend for rendering data.


### Frontend Technologies
 * ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
 * ![Pug](https://img.shields.io/badge/Pug-E3C29B?style=for-the-badge&logo=pug&logoColor=black)
 * ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
 * ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
 * ![NODE JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
 * ![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

### Backend Technologies
* ![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
* ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)


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
