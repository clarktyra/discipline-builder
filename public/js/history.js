$(document).ready(function() {
  var cTable = $("#choicesTable");

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
    var dataDis = 0;
    var dataCho = 0;
    data.forEach(element => {
      var newTr = $("<tr>");
      let test = new Date(element.createdAt);
      time = test.getHours() + ":";
      if (test.getMinutes() < 10) {
        time += "0" + test.getMinutes();
      } else {
        time += test.getMinutes();
      }

      newTr.append("<th>" + time + "</th>");
      newTr.append("<td>" + element.temptation + "</td>");
      newTr.append("<td>" + element.discipline + "</td>");
      if (element.choice === true) {
        newTr.append("<td style='background-color: #54F4AB'>Discipline</td>");
        dataDis++;
      } else {
        newTr.append("<td style='background-color: #FA5698'>Temptation</td>");
        dataCho++;
      }
      cTable.append(newTr);
    });

    var chartData = {
      datasets: [
        {
          data: [dataDis, dataCho],
          backgroundColor: ["#54F4AB", "#FA5698"]
        }
      ],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ["Discicpline", "Temptation"]
    };
    var ctx = document.getElementById("myChart").getContext("2d");
    var myDoughnutChart = new Chart(ctx, {
      type: "doughnut",
      data: chartData
      // options: options
    });
  });
});
