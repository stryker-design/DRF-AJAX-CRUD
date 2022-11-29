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
var activeItem = null;

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

      let list = data;
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

      for (var i in list) {
        var editBtn = document.getElementsByClassName("edit-btn")[i];
        var deleteBtn = document.getElementsByClassName("delete-btn")[i];
        // var task = document.getElementsByClassName("task")[i];

        editBtn.addEventListener(
          "click",
          (function (item) {
            return function () {
              editItem(item);
            };
          })(list[i])
        );

        deleteBtn.addEventListener(
          "click",
          (function (item) {
            return function () {
              deleteItem(item);
            };
          })(list[i])
        );

        // task.addEventListener(
        //   "click",
        //   (function (item) {
        //     return function () {
        //       strikeUnstrike(item);
        //     };
        //   })(list[i])
        // );
      }
    });
}

const form = document.getElementById("form-wrapper");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // Using var instead of let because let is limited to the scope.
  // var declares globally or locally to an entire function regardless of scope
  var url = "http://127.0.0.1:8000/api/task-create/";
  let task = document.getElementById("task").value;

  /* Check to see if item is null
     if item is not null change url to update and pass in the active item id
     and let the view handle the rest
  */
  if (activeItem != null) {
    var url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}`;
    // activeItem = null;
  }
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

function editItem(item) {
  console.log("Item clicked:", item);
  activeItem = item;
  document.getElementById("task").value = activeItem.task;
}

function deleteItem(item) {
  console.log("delete");

  fetch(`http://127.0.0.1:8000/api/task-delete/${item.id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  }).then((response) => {
    buildTable();
  });
}

function strikeUnstrike(item) {
  
}
