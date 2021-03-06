'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Reviews', [
        {
      'title':"Watch out Batman!",
      'reviewText':"The movie becomes about Eddie and Venom coming to an arrangement. There is a lot of humour, including a sly riff on the Batman movies from Marvel rival DC Comics.",
      'movieId':2,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},
      {
      'title':"Ryan Reynolds delivers!",
      'reviewText':"It's Ryan Reynold's show, and he really gives you everything.",
      'movieId':3,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},
      {
      'title':"I loved it!",
      'reviewText':"This well-paced flick skillfully balances all the violence and wackiness.",
      'movieId':4,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},
      {
      'title':"A waste of talent",
      'reviewText':"Snake Eyes seems to barely recognise the talents of the cast it has on hand.",
      'movieId':5,
      'userId':1,
      'userRating': 1,
      'createdAt': new Date(),
      'updatedAt': new Date()},
      {
      'title':"An excellent adaptation!",
      'reviewText':"The director Denis Villeneuve's film is the first adaptation of Frank Herbert's novel to properly portray the grim tragedy of Paul's arc; the movie is epic in scope, but it understands the quieter human underpinnings of the original work.",
      'movieId':25,
      'userId':1,
      'userRating': 4,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"My kids loved it!",
      'reviewText':"Parents will appreciate the way the pups tackle problem solving, working together to make the best use of each character's talents.",
      'movieId':28,
      'userId':1,
      'userRating': 4,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"A film nerd's dream !",
      'reviewText':"Luca, basically, is great news for film nerds and wonder-starved kids..",
      'movieId':37,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"Disappointment is an understatement...",
      'reviewText':"It's hard to call something a disappointment if there wasn't much hope for it to begin with.",
      'movieId':38,
      'userId':1,
      'userRating': 2,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"A detailed masterpiece",
      'reviewText':"The sheer volume of outfits worn by Stone and the rest of the cast, is matched only by the level of detail on each.",
      'movieId':39,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"A novel film",
      'reviewText':"Although the concept is superficially handled, with Teddy's baffled reactions not easily explained away and some hurried emotional scenes, there's plenty of novelty at play.",
      'movieId':70,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"Not very introspective",
      'reviewText':"If you are looking to learn anything more about Bieber other than his enormous talent, you need to look elsewhere.",
      'movieId':318,
      'userId':1,
      'userRating': 2,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"Amazing series!",
      'reviewText':"Oh boy!! I am picky regarding series and I was a bit sceptic about this one but boy this blew my mind! This is one of the best I've ever seen, how can this not be more hyped? The creative and intelligent story is so well thought through, the excitement and tension is crazy good. The writers behind this plot is as genius as the smart minds described in the show. There is a perfect balance between high pace excitement and slow scenes. Neatly jumping between past and present, seamlessly connecting the dots. You constantly get surprised of how you think things are. You get to know a high number of interesting characters in depth, all amazingly well acted. You will for sure be glued to this show, wanting to know the end, but at the same time not wanting it to end.",
      'movieId':425,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"An excellent documentary!",
      'reviewText':"It's one of the best documentaries of 2021.",
      'movieId':643,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"She's a genius!",
      'reviewText':"All I want to say is; the way it ended, the story told via the animation, genius! Brilliant!! I mean, it was such a ahaaa moment! Woah! Gave a new perspective to the whole album!",
      'movieId':528,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},

      {
      'title':"So many guest appearances!",
      'reviewText':"Friends: The Reunion is equal doses of sentiment and saccharine, hitting all the required marks of a television reunion. It has laughter, it has tears. It wheels out more surprise appearances than a rerun of This Is Your Life.",
      'movieId':647,
      'userId':1,
      'userRating': 5,
      'createdAt': new Date(),
      'updatedAt': new Date()},


      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
