$(document).ready(function() {
  // var cTable = $("#choicesTable");

  // $.get("/api/history").then(function(data) {
  //   console.log(data);
  //   console.log(data[0].createdAt);
  //   let test = new Date(data[0].createdAt);
  //   console.log(
  //     test.getMonth() +
  //       "/" +
  //       test.getDate() +
  //       " " +
  //       test.getHours() +
  //       ":" +
  //       test.getMinutes()
  //   );
  //   console.log(test.getMinutes());
  //   var dataDis = 0;
  //   var dataCho = 0;
  //   data.forEach(element => {
  //     var newTr = $("<tr>");
  //     let test = new Date(element.createdAt);
  //     time = test.getHours() + ":";
  //     if (test.getMinutes() < 10) {
  //       time += "0" + test.getMinutes();
  //     } else {
  //       time += test.getMinutes();
  //     }

  //     newTr.append("<th>" + time + "</th>");
  //     newTr.append("<td>" + element.temptation + "</td>");
  //     newTr.append("<td>" + element.discipline + "</td>");
  //     if (element.choice === true) {
  //       newTr.append("<td style='background-color: #54F4AB'>Discipline</td>");
  //       dataDis++;
  //     } else {
  //       newTr.append("<td style='background-color: #FA5698'>Temptation</td>");
  //       dataCho++;
  //     }
  //     cTable.append(newTr);
  //   });

  //   var chartData = {
  //     datasets: [
  //       {
  //         data: [dataDis, dataCho],
  //         backgroundColor: ["#54F4AB", "#FA5698"]
  //       }
  //     ],

  //     // These labels appear in the legend and in the tooltips when hovering different arcs
  //     labels: ["Discicpline", "Temptation"]
  //   };
  //   var ctx = document.getElementById("myChart").getContext("2d");
  //   var myDoughnutChart = new Chart(ctx, {
  //     type: "doughnut",
  //     data: chartData
  //     // options: options
  //   });
  // });

  var lineData = [50];
  var labelsData = [0];
  var cTable = $("#choicesTable");
  $.get("/api/history").then(function(data) {
    console.log(data);
    console.log(data[0].createdAt);
    let test = new Date(data[0].createdAt);
    console.log(test);
    console.log(
      test.getMonth() +
        "/" +
        test.getDate() +
        " " +
        test.getHours() +
        ":" +
        test.getMinutes()
    );
    var dataDis = 0;
    var discTemp = 0;
    let index = 1;
    data.forEach(element => {
      var newTr = $("<tr>");
      let test = new Date(element.createdAt);
      var month, day, hours, minutes, amOrPm;
      month = test.getMonth() + 1;
      day = test.getDate();
      hours = test.getHours();
      if (hours < 12) {
        amOrPm = "am";
      } else {
        amOrPm = "pm";
      }
      if (hours === 0 || hours === 00) {
        hours = 12;
      }
      if (hours > 12) {
        hours -= 12;
      }
      minutes = test.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      var time = hours + ":" + minutes + amOrPm + " " + month + "/" + day + " ";

      newTr.append("<th>" + time + "</th>");
      newTr.append("<td>" + element.temptation + "</td>");
      newTr.append("<td>" + element.discipline + "</td>");
      if (element.choice === true) {
        newTr.append(
          "<td style='background-color: #54F4AB; font-weight: bold'>Discipline</td>"
        );
      } else {
        newTr.append(
          "<td style='background-color: #FA5698; font-weight: bold'>Temptation</td>"
        );
      }
      cTable.append(newTr);
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
      lineData.push(lineDataPoint);
    });

    var chartData = {
      datasets: [
        {
          data: [dataDis, discTemp],
          backgroundColor: ["#54F4AB", "#FA5698"]
        }
      ],
      labels: ["Discicpline", "Temptation"]
    };

    var ctx = document.getElementById("myChart2").getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: chartData,
      options: {
        legend: {
          onClick: null
        }
      }
    });

    //start

    var ctx2 = document.getElementById("myLineChart2").getContext("2d");
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
                display: true
                // labelString: "Discipline Ratio"
              }
            }
          ]
        },
        legend: {
          onClick: null
        }
      }
    });

    //end
  });
});
