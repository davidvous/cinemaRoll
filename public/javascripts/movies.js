document.addEventListener('DOMContentLoaded', async event => {

  const listDropdown = document.getElementById("movieListsSelect");
  listDropdown.addEventListener("change", addMovieToList);
  console.log(listDropdown);

});


const addMovieToList = async (event) => {
  const index = event.target.selectedIndex;
  const movieListId= event.target.options[index].value;
  const movieId = event.target.className.split("Id-")[1];
  console.log("movie id -->", movieId);
  console.log("list id --->", movieListId);
  let res = await fetch('/lists/movie/add', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieListId, movieId })
  });
  let { isSuccess } = await res.json();
  // ... and I don't have to do anyting else?
  // I don't think so
};
