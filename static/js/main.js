/* KEY COMPONENTS:
		"activeItem" = null until an edit button is clicked. Will contain object of item we are editing
		"list_snapshot" = Will contain previous state of list. Used for removing extra rows on list update
			
		PROCESS:
		1 - Fetch Data and build rows "buildList()"
		2 - Create Item on form submit
		3 - Edit Item click - Prefill form and change submit URL
		4 - Delete Item - Send item id to delete URL
		5 - Cross out completed task - Event handle updated item
		NOTES:
		-- Add event handlers to "edit", "delete", "title"
		-- Render with strike through items completed
		-- Remove extra data on re-render
		-- CSRF Token */

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie("csrftoken");


fetch(url, {
  method: "POST",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-CSRFToken": getCookie("csrftoken"),
  },
});

buildTable();

function buildTable() {
  const tableWrapper = document.getElementById("table-wrapper");
  let url = "http://127.0.0.1:8000/api/task-list/"

  fetch(url)
  .then((resp) => resp.json())
  .then(function(data){
    console.log('Data', data)

    const table = data
    for (var i in data){
        try{
            document.getElementById('data-row-${i}').remove()
        }
        catch(err){

        }
    }
  })
}
