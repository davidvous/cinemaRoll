document.addEventListener('DOMContentLoaded', event => {

  const dropDown = () => {
    document.getElementById("dropDownLink").classList.toggle("show");
  }

  window.onclick = function(event) {
    //alert("test");
    if (!event.target.matches('.dropDownLink')) {
      let dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

})
