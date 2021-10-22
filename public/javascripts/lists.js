document.addEventListener('DOMContentLoaded', async event => {

  console.log("i am alive, what am i? ..");

  const addList = document.getElementById("addListButton");

  console.log("the button object", addList);

  addList.addEventListener("click", e => {
    console.log("event listener...");
  });
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

    // get side bar
    const sideBar = document.getElementById("sidebar");

    // create new list item with the list name and id
    const listItem = document.createElement("div");
    const text      = document.createTextNode(list.name);
    listItem.appendChild(text);

    sideBar.appendChild(listItem);

    console.log(sideBar);

  });

  console.log("you are an important JavaScript");

});
