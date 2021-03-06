document.addEventListener('DOMContentLoaded', async event => {

  const lists = document.getElementsByClassName("listItem");
  Array.from(lists).forEach(list => {
    list.addEventListener("click", renderList);
  });

  const addListButton = document.getElementById("addListButton");
  addListButton.addEventListener("click", addList);

  // add listeners to delete buttons on initial load
  const deleteMovieButtons = document.getElementsByClassName("delete_btn");
  Array.from(deleteMovieButtons).forEach(btn => btn.addEventListener("click", deleteMovie));
});


const renderList = async (event) => {
  // there is gotta be a better way to do this (stick into a form and get action?)
  let listId;
  if (event) listId = event.target.id.split("-")[1];
  else listId = "all";
  console.log(listId);
  const res = await fetch('/lists' + "/" + listId);

  const movies = await res.json();
  if (movies.length) {
    renderPosters(movies, listId);
  } else {
    const movieContainer = document.getElementById("top_movies_grid-4");
    movieContainer.innerText = "No movies in the list"
  }

  // bleh -- I don't have the list name from the back end
  // just fetch it from the link inner text
  const listTitle = event ? event.target.innerText.split(" (")[0] : "All";
  // set H2 to title of list
  const listTitleElement = document.getElementById("list_title_text");
  listTitleElement.innerText = "Browsing List: " + listTitle;

  // delete pre-existing "delete list" button, if the list being rendered is "all"
  const buttonContainer = document.getElementById("delete_list_button_container");
  buttonContainer.innerHTML = '';
  // for normal lists, re-render Delete List button with the list id, next to the H1 element
  if (listId !== "all") addDeleteListButton(listId);

};


const addDeleteListButton = (listId) => {
  const delForm    = document.createElement("form");
  const delButton  = document.createElement("input");
  // populate components with attributes
  delButton.id    = "deleteListButton-" + listId;
  delButton.value = "Remove List";
  delButton.type  = "button";
  delButton.className = "util_btn";
  delForm.appendChild(delButton);
  // add a listener
  delForm.addEventListener("click", deleteList);

  // add button next to the list title
  const buttonContainer = document.getElementById("delete_list_button_container");
  buttonContainer.innerHTML = '';
  buttonContainer.appendChild(delForm);

}


const renderPosters = (movies, listId) => {
  // create new elements
  const movieCards = []
  movies.forEach(movie => {
    const { id, title, posterPath } = movie;
    // create movie card components
    const wrapper    = document.createElement("div");
    const navigation = document.createElement("a");
    const image      = document.createElement("img");
    const delForm    = document.createElement("form");
    const delButton  = document.createElement("input");
    // populate components with attributes
    if (listId === "all") listId = movie.ListToMoviesJoinTable.movieListId;
    delButton.id    = "deleteMovieFromListButton-" + listId + "-" + id;
    delButton.value = "Remove";
    delButton.type  = "button";
    delButton.className = "util_btn";
    delButton.addEventListener("click", deleteMovie);
    image.src = posterPath;
    navigation.href = "/movies/" + id

    console.log(movie);

    // assemble components together
    navigation.appendChild(image);
    wrapper.appendChild(navigation);
    delForm.appendChild(delButton);
    wrapper.appendChild(delForm);

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
  listItem.id = "list-" + list.id;
  listItem.className = "listItem";
  listItem.innerText = list.name + " (0)";
  // add event listener to the newly created list item
  listItem.addEventListener("click", renderList);
  const sideBarLists = document.getElementById("sidebar_lists");
  sideBarLists.appendChild(listItem);

}


const deleteList = async (event) => {
  const listId = document.querySelector("#delete_list_button_container input").id.split("-")[1];
  console.log("list del", listId);
  let res = await fetch('/lists', {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listId })
  });
  let content = await res.json();

  const { isDeleted } = content;
  console.log("is deleted", isDeleted);
  // if success, remove corresponding list div from DOM
  if (isDeleted) {
    console.log("hello");
    console.log(listId);
    const listItem = document.getElementById("list-" + listId);
    console.log(listItem);
    listItem.remove();
    // and then re-render the "all" lists
    renderList(null);
  }

};


const deleteMovie = async (event) => {
  const [listId, movieId] = event.target.id.split("-").slice(-2);
  console.log(movieId);
  console.log(listId);
  let res = await fetch('/lists/movie', {
    method: "delete",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieId, listId })
  });
  const { isDeleted } = await res.json();
  console.log(isDeleted);

  if (isDeleted) {
    const movieCard = event.target.parentElement.parentElement; // Will break hard if HTML is changed
    movieCard.remove();

    // also update the text in the side bar

    // This is turning out too complicated, and I am strapped for time
    // address this later. Let's table this for now.
    //const listItem = document.getElementById("list-" + listId);
    //const lastPart = listItem.innerText.split(" ").slice(-1)[0];
    //const number   = lastPart.split("").slice(-1, 1);
    //console.log(number);
  }
};

