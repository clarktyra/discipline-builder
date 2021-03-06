var temp = $("#wantToDo");
var dics = $("#shouldDo");
var choi = $("#choiceDo");
const TODAY_START = new Date().setHours(0, 0, 0, 0);
var num = 0;
$(document).ready(function() {
  var lineData = [50];
  var labelsData = [0];
  var cTable = $("#choicesTable");
  $.get("/api/user_data").then(function(data) {
    var dataDis = 0;
    var discTemp = 0;
    let index = 1;
    data.forEach(element => {
      var newTr = $("<tr>");
      let test = new Date(element.createdAt);
      var hours, minutes, amOrPm;
      hours = test.getHours();
      if (hours < 12) {
        amOrPm = " am";
      } else {
        amOrPm = " pm";
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

      var time = hours + ":" + minutes + amOrPm;

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

    var ctx = document.getElementById("myChart").getContext("2d");
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

    var ctx2 = document.getElementById("myLineChart").getContext("2d");
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
    window.location.href = "/today";
    console.log("success");
  }).then(function() {
    window.location.replace("/today");
  });
}
$(document).on("submit", handleSubmit);

//chart begin
var myChart = document.getElementById("myChart");
var myLineChart = document.getElementById("myLineChart");
toggle();
function toggle() {
  console.log("hellor");
  if (myChart.style.visibility === "visible") {
    myChart.style.visibility = "hidden";
    myLineChart.style.visibility = "visible";
  } else {
    myChart.style.visibility = "visible";
    myLineChart.style.visibility = "hidden";
  }
}

//chart end

$(".test").click(function() {
  console.log("hello");
  toggle();
  // window.location.replace("/members");
});
