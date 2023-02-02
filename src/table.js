function getLength(){
    return 0;
}

function addTrack(rank, track, playtime, length, percentage){
    response.tbldata.push({
        "rank": rank,
        "track": track,
        "playtime": playtime,
        "length": length,
        "percentage": percentage,
    });

}

const response = {
    "tbldata": [
       {
          "rank": null,
          "track": null,
          "playtime": null,
          "length": null,
          "percentage": null,
       },
    ]
}

const tableContent = document.getElementById("table-content")
const tableButtons = document.querySelectorAll("th button");

const createRow = (obj) => {
  const row = document.createElement("tr");
  const objKeys = Object.keys(obj);
  objKeys.map((key) => {
    const cell = document.createElement("td");
    cell.setAttribute("data-attr", key);
    cell.innerHTML = obj[key];
    row.appendChild(cell);
  });
  return row;
};

const getTableContent = (data) => {
  data.map((obj) => {
    const row = createRow(obj);
    tableContent.appendChild(row);
  });
};

const sortData = (data, param, direction = "asc") => {
  tableContent.innerHTML = '';
  const sortedData =
    direction == "asc"
      ? [...data].sort(function (a, b) {
          if (a[param] < b[param]) {
            return -1;
          }
          if (a[param] > b[param]) {
            return 1;
          }
          return 0;
        })
      : [...data].sort(function (a, b) {
          if (b[param] < a[param]) {
            return -1;
          }
          if (b[param] > a[param]) {
            return 1;
          }
          return 0;
        }); 

  getTableContent(sortedData);
};

const resetButtons = (event) => {
  [...tableButtons].map((button) => {
    if (button !== event.target) {
      button.removeAttribute("data-dir");
    }
  });
};

window.addEventListener("load", () => {
  getTableContent(response.tbldata);

  [...tableButtons].map((button) => {
    button.addEventListener("click", (e) => {
      resetButtons(e);
      if (e.target.getAttribute("data-dir") == "desc") {
        sortData(response.tbldata, e.target.id, "desc");
        e.target.setAttribute("data-dir", "asc");
      } else {
        sortData(response.tbldata, e.target.id, "asc");
        e.target.setAttribute("data-dir", "desc");
      }
    });
  });
});