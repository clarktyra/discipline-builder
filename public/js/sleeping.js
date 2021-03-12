console.log("test1");
var notesInput = $("#wantToDo");

function handleSubmit(e) {
  e.preventDefault();
  console.log("test2");
  console.log(notesInput.val());

  var beginTimeInput = document.getElementById("beginTime").valueAsDate;

  console.log(beginTimeInput);
}

$(document).on("submit", handleSubmit);
