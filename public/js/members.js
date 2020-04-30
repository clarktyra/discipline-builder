var temp = $("#wantToDo");
var dics = $("#shouldDo");
var choi = $("#choiceDo");
$(document).ready(function() {
  var lineData = [50];
  var labelsData = [0];
  // var temp = $("#wantToDo");
  // var dics = $("#shouldDo");
  // var choi = $("#choiceDo");
  var cTable = $("#choicesTable");
  var tableHead = $("#tableHead");

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // $.get("/api/user_data").then(function(data) {
  //   $(".member-name").text(data.email);
  //   // also grab all their posts data
  //   console.log(data)
  // });
  let test2 = new Date();
  console.log(test2);
  // tableHead.text(test2.getMonth() + 1 + "/" + test2.getDate());
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
    var discTemp = 0;
    let index = 1;
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
        newTr.append(
          "<td style='background-color: #54F4AB; font-weight: bold'>Discipline</td>"
        );
        // dataDis++;
      } else {
        newTr.append(
          "<td style='background-color: #FA5698; font-weight: bold'>Temptation</td>"
        );
        // discTemp++;
      }
      cTable.prepend(newTr);
      // labelsData.push(index);
      // index++;
      // var lineDataPoint = Math.round((dataDis / index) * 100);
      // console.log(dataDis, index, lineDataPoint);
      // lineData.push(lineDataPoint);
      // console.log(lineData);
    });

    var reversedData = data.reverse();
    reversedData.forEach(element => {
      if (element.choice === true) {
        dataDis++;
      } else {
        discTemp++;
      }
      labelsData.push(index);
      index++;
      var lineDataPoint = Math.round((dataDis / (index - 1)) * 100);
      console.log(dataDis, index, lineDataPoint);
      lineData.push(lineDataPoint);
      console.log(lineData);
    });

    var chartData = {
      datasets: [
        {
          data: [dataDis, discTemp],
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

    var ctx2 = document.getElementById("myLineChart").getContext("2d");
    // var myLineChart = new Chart(ctx, {
    //   type: "line",
    //   data: lineData,
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           // beginAtZero: true
    //           max: 100,
    //           min: 0
    //         }
    //       ]
    //     }
    //   }
    // });

    new Chart(ctx2, {
      type: "line",
      data: {
        labels: labelsData,
        datasets: [
          {
            data: lineData,
            label: "Discipline Ratio",
            borderColor: "#54F4AB",
            backgroundColor: "#54F4AB",
            fill: false
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                zeroLineColor: "black",
                zeroLineWidth: 2
              },
              ticks: {
                min: 0,
                max: 100,
                stepSize: 25
              },
              scaleLabel: {
                display: true,
                labelString: "Discipline Ratio"
              }
            }
          ]
        }
      }
    });
  });

  // $.get("/api/sum").then(function(data) {
  //   console.log("data123: ", data);
  // });
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
    window.location.href = "/members";
    console.log("success");
  }).then(function() {
    window.location.replace("/members");
  });
}

$(document).on("submit", handleSubmit);
