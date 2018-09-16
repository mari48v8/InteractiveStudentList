"use strict";

window.addEventListener("DOMContentLoaded", initiateFrontEnd);

function initiateFrontEnd() {
  document
    .querySelector("button#sort_firstname")
    .addEventListener("click", clickedSortFirstname);
  document
    .querySelector("button#sort_lastname")
    .addEventListener("click", clickedSortLastname);

  document
    .querySelector("table#studentlist")
    .addEventListener("click", clickedTable);
}

function clickedTable(event) {
  //    console.log("clicked table");
  //    console.log(event.target);

  const clicked = event.target;
  //    console.log(clicked.tagName);
  if (clicked.tagName.toLowerCase() === "button") {
    // NOTE: When we have more buttons, check which kind was clicked (on class or something)
    clickedDelete(clicked);
  }
}

function clickedDelete(deleteButton) {
  //    console.log(deleteButton);
  // find the parent <tr> that has this deleteButton inside it
  let tr = deleteButton.parentElement;
  while (tr.tagName !== "TR") {
    tr = tr.parentElement;
  }

  // find the studentId
  const studentId = tr.dataset.studentId;
  console.log(studentId);

  deleteStudent(studentId);

  // animate the <tr> out
  animateDelete(tr);
  // remove that <tr>
  //tr.remove();
}

function animateDelete(tr) {
  tr.style.transform = "translateX(-105%)";
  tr.style.transition = "transform 1s";

  // tr.classList.add("fly-out");
  const rect = tr.getBoundingClientRect();

  tr.addEventListener("transitionend", function() {
    // find the nextSibling (the tr below this)
    let nextSibling = tr.nextElementSibling;

    if (nextSibling !== null) {
      nextSibling.addEventListener("transitionend", function() {
        console.log("transition end");

        // reset all the translateY!
        let nextTr = tr.nextElementSibling;
        while (nextTr !== null) {
          nextTr.style.transform = "translateY(0)";
          nextTr.style.transition = "transform 0s";

          nextTr = nextTr.nextElementSibling;
        }

        // remove that <tr>
        tr.remove();
      });

      while (nextSibling !== null) {
        nextSibling.style.transform = "translateY(-" + rect.height + "px)";
        nextSibling.style.transition = "transform 0.5s";

        nextSibling = nextSibling.nextElementSibling;
      }
    } else {
      // no next sibling - just remove!
      tr.remove();
    }
  });
}

function clickedSortFirstname() {
  sortByFirstName();
  displayList(currentStudents);
}

function clickedSortLastname() {
  sortByLastName();
  displayList(currentStudents);
}

function displayList(listOfStudents) {
  console.log("Display list");
  // clear the table
  document.querySelector("table#studentlist tbody").innerHTML = "";

  // foreach student in listOfStudents
  listOfStudents.forEach(function(student) {
    // clone a table-row for student
    const clone = document
      .querySelector("#student_template")
      .content.cloneNode(true);

    // fill in the clone with data
    clone.querySelector("[data-firstname]").textContent = student.firstName;
    clone.querySelector("[data-lastname]").textContent = student.lastName;

    // add the studentId to the <tr>
    clone.querySelector("tr").dataset.studentId = student.id;

    // append clone to table
    document.querySelector("table#studentlist tbody").appendChild(clone);
  });
}
