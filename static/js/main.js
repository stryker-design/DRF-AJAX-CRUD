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

// Get the CSRF token
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

// Call build table function
buildTable();

function buildTable() {
  const tableWrapper = document.getElementById("table-wrapper");
  tableWrapper.innerHTML = "";
  const url = "http://127.0.0.1:8000/api/task-list/";

  fetch(url)
    .then((resp) => resp.json())
    .then(function (data) {
      console.log("Data", data);

      const list = data;
      for (var i in data) {
        // try{
        //     document.getElementById('data-row-${i}').remove()
        // }
        // catch(err){

        // }

        let item = `
        <div id="data-row-${i}">
        
            <td class="whitespace-nowrap px-3 py-4 border-b">
                ${list[i].task}
            </td>
            <td class="border-b px-3 py-4 text-sm text-gray-500">
                <button href="#" class="text-indigo-600 bg-red py-2 px-4 border rounded border-black hover:text-indigo-900 edit-btn w-fit ">Edit</button>
            </td>
            <td class="flex border-b justify-start  py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <button type="submit" class=" border border-black py-2 px-4 rounded text-indigo-600 hover:text-indigo-900 delete-btn">Delete</button>
            </td> 
        </div>
        `;

        tableWrapper.innerHTML += item;
      }
    });
}

const form = document.getElementById("form-wrapper");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const url = "http://127.0.0.1:8000/api/task-create/";
  const task = document.getElementById("task").value;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
    body: JSON.stringify({ task: task }),
  }).then(function (response) {
    buildTable();
    document.getElementById("form").reset();
  });
});
