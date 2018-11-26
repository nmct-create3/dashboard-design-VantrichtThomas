'use strict';
let daySelect, graph

document.addEventListener('DOMContentLoaded', function() {
  console.log("Script loaded");
  init();
});

function drawChart(aantalBezoekers) {
  console.log(aantalBezoekers);

  let ctx = graph.getContext('2d');
  let gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(163,160,251,0.3)');
  gradient.addColorStop(1, 'rgb(255,255,255,0)');

  let myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
      datasets: [{
        label: "Visitors",
        pointBackgroundColor: "#FFF",
        pointBorderColor: "#A3A0FB",
        pointBorderWidth: 2,
        fill: true,
        backgroundColor: gradient,
        borderColor: "#A3A0FB",
        data: aantalBezoekers
      }]
    },
    options: {
      elements: {
        line: {
          tension: .3
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            autoSkip: false,
            max: 50
          },

        }],
        xAxes: [{
          ticks: {
            autoSkip: false
          }
        }]
      },
      legend: {
        position: "bottom"
      }
    }
  });
}

function getData(json) {
  let dataGraph = [];
  for (let i = 0; i < json.length; i++) {
    let tijdstip = json[i];
    dataGraph.push(tijdstip.aantalBezoekers);
  }
  drawChart(dataGraph);
}

function getVisitorsByDay(day) {
  const ENDPOINT = "https://iotcloud-nmct.azurewebsites.net/api/visitors/";

  fetch(`${ENDPOINT}${day}`)
    .then(result => { return result.json(); })
    // Als dat gelukt is, gaan we naar onze showResult functie.
    .then(data => getData(data))
    .catch(err => console.error(err))
}

function init() {
  graph = document.querySelector(".js-graph");
  daySelect = document.querySelector(".js-day");

  getVisitorsByDay(daySelect.value);

  daySelect.addEventListener("change", function(e) {
    console.log(e.target.value);
    getVisitorsByDay(e.target.value);
  }, false);
}
