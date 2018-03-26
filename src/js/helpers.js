function setDateToToday() {
  var now = new Date();
  var day = ("0" + now.getDate()).slice(-2);
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var today = now.getFullYear() + "-" + month + "-" + day;
  $("#date").val(today);
}

function updateTableWithFixerData(
  endpoint,
  access_key,
  tableContent,
  tableTemplate,
  rows
) {
  $.ajax({
    url: "http://data.fixer.io/api/" + endpoint + "?access_key=" + access_key,
    dataType: "jsonp",
    success: function(json) {
      var tables = [];
      tables = generateTables(json, tableTemplate, rows);
      tableContent.innerHTML = "";
      for (let i = 0; i < rows; i++) {
        tableContent.appendChild(tables[i]);
      }
    }
  });
}

function generateTables(data, tableTemplate, rows) {
  var arr = [];
  for (var key in data.rates) {
    if (data.rates.hasOwnProperty(key)) {
      var obj = {};
      obj.currency = key;
      obj.value = data.rates[key];
      arr.push(obj);
    }
  }
  var columns = [];
  const num = arr.length / rows;
  for (var i = 0; i < rows; i++) {
    columns[i] = gTable(arr.splice(0, num), tableTemplate);
  }
  return columns;
}

function gTable(data, tableTemplate) {
  var tableClone = tableTemplate.cloneNode(true);
  for (let index = 0; index < data.length; index++) {
    var tr = document.createElement("tr");
    var tdCurrency = document.createElement("td");
    var textCurrency = document.createTextNode(data[index].currency);
    var tdRate = document.createElement("td");
    var textRate = document.createTextNode(data[index].value);
    tdCurrency.appendChild(textCurrency);
    tdRate.appendChild(textRate);
    tr.appendChild(tdCurrency);
    tr.appendChild(tdRate);
    tableClone.getElementsByTagName("table")[0].appendChild(tr);
  }
  tableClone.style.display = "block";
  return tableClone;
}

function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("myTable2");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

module.exports = {
  updateTableWithFixerData,
  setDateToToday
};
