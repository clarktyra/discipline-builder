$(document).ready(function() {
  var temp = $("#wantToDo");
  var dics = $("#shouldDo");
  var choi = $("#choiceDo");
  var cTable = $("#choicesTable");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(function(data) {
  //   $(".member-name").text(data.email);
  //   // also grab all their posts data
  //   console.log(data)
  // });

  $.get("/api/user_data").then(function(data) {
    console.log(data);
    console.log(data[0].createdAt);
    let test = new Date(data[0].createdAt);
    console.log(
      test.getMonth() +
        "/" +
        test.getDate() +
        " " +
        test.getHours() +
        ":" +
        test.getMinutes()
    );
    console.log(test.getMinutes());
    data.forEach(element => {
      var newTr = $("<tr>");
      let test = new Date(element.createdAt);
      time =
        test.getMonth() + "/" + test.getDate() + " " + test.getHours() + ":";
      if (test.getMinutes() < 10) {
        time += "0" + test.getMinutes();
      } else {
        time += test.getMinutes();
      }

      newTr.append("<th>" + time + "</th>");
      newTr.append("<td>" + element.temptation + "</td>");
      newTr.append("<td>" + element.discipline + "</td>");
      if (element.choice === true) {
        newTr.append("<td class='bg-success'>DISCIPLINE</td>");
      } else {
        newTr.append("<td class='bg-danger'>TEMPTATION</td>");
      }
      cTable.append(newTr);
    });
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
    }).then(function() {
      window.location.reload();
    });
  }

  $(document).on("submit", handleSubmit);
});
