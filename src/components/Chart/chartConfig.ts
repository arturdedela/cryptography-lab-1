import * as Chartjs from "chart.js";

// const backgroundColor = [
//     "rgba(255, 99, 132, 0.2)",
//     "rgba(255, 159, 64, 0.2)",
//     "rgba(255, 205, 86, 0.2)",
//     "rgba(75, 192, 192, 0.2)",
//     "rgba(54, 162, 235, 0.2)",
//     "rgba(153, 102, 255, 0.2)",
//     "rgba(201, 203, 207, 0.2)"
// ];
// const borderColor = [
//     "rgb(255, 99, 132)",
//     "rgb(255, 159, 64)",
//     "rgb(255, 205, 86)",
//     "rgb(75, 192, 192)",
//     "rgb(54, 162, 235)",
//     "rgb(153, 102, 255)",
//     "rgb(201, 203, 207)"
// ];
export const chartConfig: Chartjs.ChartConfiguration = {
    type: "bar",
    data: {
        labels: [],
        datasets: [{
            label: "Choose algorithm",
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgb(153, 102, 255)",
            borderWidth: 2,
            data: []
        }]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: "index",
            intersect: false,
        },
        hover: {
            mode: "nearest",
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "File size (MBs)"
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: "Time (ms)"
                }
            }]
        }
    }
};