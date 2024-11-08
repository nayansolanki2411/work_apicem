looker.plugins.visualizations.add({
  id: "bar_plus_line_chart",
  label: "Bar Plus Line Chart",
  options: {
    bar_color: {
      type: "string",
      label: "Bar Color",
      display: "color",
      default: "#1f77b4"
    },
    line_color: {
      type: "string",
      label: "Line Color",
      display: "color",
      default: "#ff7f0e"
    }
  },
  create: function (element, config) {
    element.innerHTML = "";
    this.chart = document.createElement("div");
    element.appendChild(this.chart);
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    const categories = data.map(row => row[queryResponse.fields.dimensions[0].name].value);
    const barValues = data.map(row => row[queryResponse.fields.measures[0].name].value);
    const lineValues = data.map(row => row[queryResponse.fields.measures[1].name].value);

    const chartData = {
      labels: categories,
      datasets: [
        {
          type: "bar",
          label: "Bar Data",
          data: barValues,
          backgroundColor: config.bar_color,
        },
        {
          type: "line",
          label: "Line Data",
          data: lineValues,
          borderColor: config.line_color,
          fill: false,
        }
      ]
    };

    const options = {
      responsive: true,
      scales: {
        yAxes: [
          {
            type: "linear",
            position: "left",
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Bar Data Axis"
            }
          },
          {
            type: "linear",
            position: "right",
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Line Data Axis"
            }
          }
        ]
      }
    };

    const ctx = this.chart.getContext("2d");
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.chartInstance = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: options
    });
    
    done();
  }
});
