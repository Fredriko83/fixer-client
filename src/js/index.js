import $ from "jquery";


const {
  setDateToToday,
  getFixerData,
  updateTableWithFixerData
} = require("./helpers");
const { setCookie, getCookie } = require("./cookies");

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
  var date = document.getElementById("date"); // Get date picker

  setDateToToday();
  var apikey = getCookie("apikey");
  if (apikey == "") {
    modal.style.display = "block";
  } else {
    var data = updateTableWithFixerData(
      "latest",
      apikey,
      tableContent,
      tableTemplate,
      4
    );
  }

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };

  // Close Modal on BTN Cancel
  modalCancel.onclick = function() {
    modal.style.display = "none";
  };

  // Set token
  modalOk.onclick = function() {
    modal.style.display = "none";
    token = tokenInput.value;
    setCookie("apikey", token, 30);
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  $( "#date" ).change(function() {
    updateTableWithFixerData(
      date.value,
      apikey,
      tableContent,
      tableTemplate,
      4
    );
  });

  if (matchMedia) {
    const mq0 = window.matchMedia("(max-width: 599px)");
    const mq1 = window.matchMedia("(min-width: 600px)");
    const mq2 = window.matchMedia("(max-width: 1199px)");
    const mq3 = window.matchMedia("(min-width: 1200px)");
    mq0.addListener(WidthChange0);
    mq1.addListener(WidthChange1);
    mq2.addListener(WidthChange2);
    mq3.addListener(WidthChange3);
  }

  // media query change
  function WidthChange0(mq) {
    if (mq.matches) {
      updateTableWithFixerData(
        date.value,
        apikey,
        tableContent,
        tableTemplate,
        1
      );
    }
  }
  function WidthChange1(mq) {
    if (mq.matches) {
      updateTableWithFixerData(
        date.value,
        apikey,
        tableContent,
        tableTemplate,
        2
      );
    }
  }
  function WidthChange2(mq) {
    if (mq.matches) {
      updateTableWithFixerData(
        date.value,
        apikey,
        tableContent,
        tableTemplate,
        2
      );
    }
  }

  function WidthChange3(mq) {
    if (mq.matches) {
      updateTableWithFixerData(
        date.value,
        apikey,
        tableContent,
        tableTemplate,
        4
      );
    } 
  }
});
