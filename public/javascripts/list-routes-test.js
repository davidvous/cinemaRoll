//
//
// THIS IS A TEST FILE FOR PLAYING AROUND WITH ROUTES
// IT IS NOT PART OF THE APPLICATION
//
// -- to enable test display on the movie page,
//    uncomment the pug import ("list-routes-test.pug") in mymovies.pug view
//
//

document.addEventListener('DOMContentLoaded', async event => {

  // get side bar
  const sideBar = document.getElementById("sidebar");
  const listDisplay = document.getElementById("list-test");


  const addList = document.getElementById("addListButton");
  addList.addEventListener("click", async (event) => {
    event.preventDefault() 

    const listName  = document.getElementById("listName").value;
    let res = await fetch('/lists', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listName })
    });

    let content = await res.json();
    const { list } = content;



    // create new list item with the list name and id
    const listItem = document.createElement("div");
    listItem.id = "list-id-" + list.id;
    const text      = document.createTextNode(list.name + "___id_" + list.id);
    listItem.appendChild(text);

    sideBar.appendChild(listItem);


  });



  const deleteListButton = document.getElementById("deleteListButton");
  deleteListButton.addEventListener("click", async (event) => {
    const listId = document.getElementById("listId-delete").value;
    let res = await fetch('/lists', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listId})
    });
    let content = await res.json();

    const { isDeleted } = content;

    // if success, remove corresponding list div from DOM
    if (isDeleted) {
      const listItem = document.getElementById("list-id-" + listId);
      listItem.remove();
    }

  });


  const getListButton = document.getElementById("getListButton");
  getListButton.addEventListener("click", async (event) => {
    const listId= document.getElementById("listId-get").value;
    let res = await fetch('/lists' + "/" + listId);
    let content = await res.json();
    if (content.message) {
      listDisplay.innerText = content.message;
    } else {
      const titles = content.Movies.map(m => m.title).join("\n");
      listDisplay.innerText = titles;//JSON.stringify(titles);
    }
  });

});
