document.addEventListener('DOMContentLoaded', async event => {

  const sideBar = document.getElementById("sidebar");
  const lists = document.getElementsByClassName("listItem");

  Array.from(lists).forEach(list => {
    list.addEventListener("click", listRender);
  });
  console.log(lists);

});


const listRender = async (event) => {
  // there is gotta be a better way to do this (stick into a form and get action?)
  const listId = event.target.id.split("-")[1];
  let res = await fetch('/lists' + "/" + listId);
  let content = await res.json();
  if (content.message) {
    //listDisplay.innerText = content.message;
    console.log("hello");
  } else {
    const titles = content.Movies.map(m => m.title).join("\n");
    console.log(titles);
  }
};


const renderPosters = () => {

}
