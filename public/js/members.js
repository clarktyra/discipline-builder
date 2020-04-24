$(document).ready(function() {
  var temp = $("#wantToDo");
  var dics = $("#shouldDo");
  var choi = $("#choiceDo");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    // also grab all their posts data
  });

  function handleSubmit() {
    event.preventDefault();
    if (!temp.val() || !dics.val() || !choi.val()) {
      return;
    }
    var theChoice = {
      temptation: temp.val(),
      discipline: dics.val(),
      choice: choi.val()
    };
    console.log(theChoice);
    $.post("/api/choices", theChoice, function() {
      // window.location.href = "/members";
      console.log("success");
    });
  }

  $(document).on("submit", handleSubmit);
});
