document.addEventListener('DOMContentLoaded', async event => {

  const listDropdown = document.getElementById("movieListsSelect");
  listDropdown.addEventListener("change", addMovieToList);

});


const addMovieToList = async (event) => {
  const index = event.target.selectedIndex;
  const movieListId= event.target.options[index].value;
  const movieId = event.target.className.split("Id-")[1];
  let res = await fetch('/lists/movie/add', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ movieListId, movieId })
  });
  let { isSuccess } = await res.json();
};
