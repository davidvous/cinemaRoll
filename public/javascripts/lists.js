document.addEventListener('DOMContentLoaded', async event => {

  const lists = document.getElementsByClassName("listItem");
  Array.from(lists).forEach(list => {
    list.addEventListener("click", renderList);
  });

  const addListButton = document.getElementById("addListButton");
  addListButton.addEventListener("click", addList);

});


const renderList = async (event) => {
  // there is gotta be a better way to do this (stick into a form and get action?)
  const listId = event.target.id.split("-")[1];
  const res = await fetch('/lists' + "/" + listId);

  const movies = await res.json();
  if (movies.length) {
    renderPosters(movies);
  } else {
    const movieContainer = document.getElementById("top_movies_grid-4");
    movieContainer.innerText = "No movies in the list"
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


const addList = async (event) => {
  event.preventDefault() // <-- not sure if needed

  // get content of the form
  // need a breaker here to prevent empty form submission
  const listName  = document.getElementById("listName").value;
  console.log("POST'ing new list to database");
  let res = await fetch('/lists', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listName })
  });
  let content = await res.json();
  const { list } = content;

  console.log(list);

  // create new list item with the list name and id
  const listItem = document.createElement("div");
  listItem.id = "list-id-" + list.id;
  listItem.className = "listItem";
  listItem.innerText = list.name + " (0)";
  const sideBarLists = document.getElementById("sidebar_lists");
  sideBarLists.appendChild(listItem);

}
