"use strict";

window.addEventListener("DOMContentLoaded", init);

const allStudents = [];
let currentStudents = [];

const InteractiveStudentList = {
  firstName: "",
  lastName: "",
  toString() {
    return this.firstName + " " + this.lastName;
  },
  splitName(fullName) {
    const firstSpace = fullName.indexOf(" ");
    this.firstName = fullName.substring(0, firstSpace);
    this.lastName = fullName.substring(firstSpace + 1);
  }
};

function init() {
  allStudents.splice(0, allStudents.length); // from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript

  // fetch JSON
  fetchData();

  // parse JSON
  // --- done via fetchJSON
}

function fetchData() {
  const url = "frontenders2018.json";

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(getJson);
}

function getJson(jsondata) {
  jsondata.forEach(element => {
    buildList(element);
  });
  currentStudents = allStudents;
  displayList(currentStudents);
}

function buildList(fullName) {
  const student = Object.create(InteractiveStudentList);
  student.splitName(fullName);
  student.id = generateUUID();
  allStudents.push(student);
}

// from: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); //use high-precision timer if available
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function deleteStudent(studentId) {
  // find the index of the student with studentId

  const index = allStudents.findIndex(findStudent);
  console.log("found index: " + index);

  allStudents.splice(index, 1);

  // function that returns true when student.id == studentId
  function findStudent(student) {
    if (student.id === studentId) {
      return true;
    } else {
      return false;
    }
  }
}

function sortByFirstName() {
  currentStudents.sort(byFirstName);

  function byFirstName(a, b) {
    if (a.firstName < b.firstName) {
      return -1;
    } else if (a.firstName > b.firstName) {
      return 1;
    } else {
      return 0;
    }
  }
}

function sortByLastName() {
  currentStudents.sort(byLastName);

  function byLastName(a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  }
}

function listOfStudents() {
  let str = "";

  allStudents.forEach(student => (str += student + "\n"));

  return str;
}
