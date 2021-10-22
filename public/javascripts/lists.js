document.addEventListener('DOMContentLoaded', async event => {

  console.log("i am alive, what am i? ..");
  // get side bar
  const sideBar = document.getElementById("sidebar");
  const listDisplay = document.getElementById("list-test");


  const addList = document.getElementById("addListButton");
  addList.addEventListener("click", async (event) => {
    event.preventDefault() // <-- not sure if needed

    // get content of the form
    // need a breaker here to prevent empty form submission
    const listName  = document.getElementById("listName").value;
    //const listName = form.value;
    console.log("POST'ing new list to database");
    let res = await fetch('/lists', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listName })
    });

    let content = await res.json();
    console.log(content);
    const { list } = content;

    console.log(list);


    // create new list item with the list name and id
    const listItem = document.createElement("div");
    listItem.id = "list-id-" + list.id;
    const text      = document.createTextNode(list.name + "___id_" + list.id);
    listItem.appendChild(text);

    sideBar.appendChild(listItem);

    console.log(sideBar);

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
      console.log("hello");
      const listItem = document.getElementById("list-id-" + listId);
      console.log(listItem);
      listItem.remove();
    }

  });


  const getListButton = document.getElementById("getListButton");
  getListButton.addEventListener("click", async (event) => {
    const listId= document.getElementById("listId-get").value;
    let res = await fetch('/lists' + "/" + listId);
    let content = await res.json();

    const titles = content.Movies.map(m => m.title).join("\n");
    console.log(titles);
    //console.log(listDisplay);
    listDisplay.innerText = titles;//JSON.stringify(titles);
  });

  console.log("you are an important JavaScript");
});
