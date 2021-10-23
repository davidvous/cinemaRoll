document.addEventListener('DOMContentLoaded', async event => {

  const sideBar = document.getElementById("sidebar");
  const lists = document.getElementsByClassName("listItem");

  Array.from(lists).forEach(list => {
    list.addEventListener("click", renderList);
  });
  console.log(lists);

});


const renderList = async (event) => {
  // there is gotta be a better way to do this (stick into a form and get action?)
  const listId = event.target.id.split("-")[1];
  const res = await fetch('/lists' + "/" + listId);

  const movies = await res.json();
  if (movies.message) {
    //listDisplay.innerText = content.message;
    console.log("hello");
  } else {
    console.log(movies);
    renderPosters(movies);
  }
};


const renderPosters = (movies) => {
  console.log(movies);
  // create new elements
  const movieCards = []
  movies.forEach(movie => {
    const { id, title, posterPath } = movie;
    // create movie card components
    const wrapper    = document.createElement("div");
    const navigation = document.createElement("a");
    const image      = document.createElement("img");
    // populate components with attributes
    image.src = posterPath;
    navigation.href = "/movies/" + id
    // assemble components together
    navigation.appendChild(image);
    wrapper.append(navigation);
    wrapper.className = "movie_wrapper"
    movieCards.push(wrapper);
  });

  // delete existing movie cards from the page & insert new ones
  const movieContainer = document.getElementById("top_movies_grid-4");
  movieContainer.innerHTML = '';
  movieCards.forEach(card => movieContainer.appendChild(card));
}
