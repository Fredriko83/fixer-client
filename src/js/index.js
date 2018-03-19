import $ from "jquery";

const { setDateToToday, getFixerData, updateTableWithFixerData } = require("./helpers");
const { setCookie, getCookie} = require("./cookies");

$(document).ready(function() {
  var token = ""; // Holds the apikey
  var modal = document.getElementById("myModal"); // Get the modal
  var btn = document.getElementById("myBtn"); // Get the button that opens the modal
  var modalCancel = document.getElementsByClassName("token-close")[0]; // Get the <span> element that closes the modal
  var tokenInput = document.getElementById("token"); // Get token text field
  //Get the checkbox
  var modalOk = document.getElementsByClassName("token-ok")[0]; // Get token ok btn
  var tableTemplate = document.getElementById("table-template"); // Get table template
  var tableContent = document.getElementById("table-content"); // Get table content div

  setDateToToday();
  var apikey = getCookie("apikey");
  if (apikey == "") {
    modal.style.display = "block";
  } else {
    var data = updateTableWithFixerData("latest", apikey, tableContent, tableTemplate)
  }

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };

  // Close Modal on BTN Cancel
  modalCancel.onclick = function() {
    modal.style.display = "none";
  };

  // Set token (optionally set to cookie aswell)
  modalOk.onclick = function() {
    modal.style.display = "none";
    token = tokenInput.value;
    setCookie("apikey", token, 30);
    //var data = getFixerData("latest", token);
    //generateTables(data);
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
