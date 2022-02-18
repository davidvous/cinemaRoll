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
let regex = /\(.*\)/;
const getNamesOfCurrentLists = () => {
  const allListNames = []
  const listsCollection = document.getElementsByClassName("listItem")
  for (let index = 0; index < listsCollection.length; index++) {
    const list = listsCollection[index];
    const totalList = list.innerHTML
    let listName
    if(listName =="All"){
      allListNames.push(listName)

    }else{
      listName = list.innerHTML.slice(0, totalList.length-4)
      allListNames.push(listName)

    }
  }
  
  return allListNames
}


const renderList = async (event) => {
  // there is gotta be a better way to do this (stick into a form and get action?)
  let listId;
  if (event) listId = event.target.id.split("-")[1];
  else listId = "all";
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

  let prevError = document.getElementById('dupeListError')
  if (prevError) {
    prevError.remove()
  }

  // get content of the form
  // need a breaker here to prevent empty form submission
  const currentLists = getNamesOfCurrentLists()
  const listName  = document.getElementById("listName").value;
  if (currentLists.indexOf(listName)!=-1) {
    const sidebarLists = document.getElementById("sidebar_lists")
    
    const errorMessage = document.createElement("h2")
    errorMessage.className = "dupeListError"
    errorMessage.setAttribute("id", "dupeListError")
    errorMessage.innerHTML =`The list ${listName} already exists. Please choose a different list name.`;
    document.getElementById("sidebar_lists").parentNode.insertBefore(errorMessage, document.getElementById("sidebar_lists"));
    return
  }
  let res = await fetch('/lists', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listName })
  });
  let content = await res.json();
  const { list } = content;


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
  let res = await fetch('/lists', {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ listId })
  });
  let content = await res.json();

  const { isDeleted } = content;
  // if success, remove corresponding list div from DOM
  if (isDeleted) {
    const listItem = document.getElementById("list-" + listId);
    listItem.remove();
    // and then re-render the "all" lists
    renderList(null);
  }

};


const deleteMovie = async (event) => {
  const [listId, movieId] = event.target.id.split("-").slice(-2);

  let res = await fetch('/lists/movie', {
    method: "delete",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieId, listId })
  });
  const { isDeleted } = await res.json();

  if (isDeleted) {
    const movieCard = event.target.parentElement.parentElement; // Will break hard if HTML is changed
    movieCard.remove();

  }
};
