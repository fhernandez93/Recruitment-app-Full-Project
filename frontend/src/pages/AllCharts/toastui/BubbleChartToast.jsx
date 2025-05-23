import React from "react"
import "tui-chart/dist/tui-chart.css"
import { BubbleChart } from "@toast-ui/react-chart"
import TuiChart from "tui-chart"
import "./toastui.scss"

const theme = {
  chart: {
    background: {
      color: "#fff",
      opacity: 0
    }
  },
  title: {
    color: "#8791af"
  },
  xAxis: {
    title: {
      color: "#8791af"
    },
    label: {
      color: "#8791af"
    },
    tickColor: "#8791af"
  },
  yAxis: {
    title: {
      color: "#8791af"
    },
    label: {
      color: "#8791af"
    },
    tickColor: "#8791af"
  },
  plot: {
    lineColor: "rgba(166, 176, 207, 0.1)"
  },
  legend: {
    label: {
      color: "#8791af"
    }
  },
  series: {
    colors: ["#556ee6", "#34c38f", "#f1b44c", "#f46a6a"]
  }
}
TuiChart.registerTheme("optumusTheme", theme)

const BubbleChartToast = props => {
  const data = {
    series: [
      {
        name: "Africa",
        data: [
          { x: 4200, y: 70.35, r: 32209101, label: "Morocco" },
          { x: 4200, y: 70.71, r: 76117421, label: "Egypt" },
          { x: 5900, y: 56.46, r: 1355246, label: "Gabon" },
          { x: 6600, y: 72.74, r: 32129324, label: "Algeria" },
          { x: 6700, y: 76.28, r: 5631585, label: "Libya" },
          { x: 7100, y: 74.66, r: 9974722, label: "Tunisia" },
          { x: 10500, y: 69.28, r: 1096585, label: "Trinidad and Tobago" },
          { x: 12800, y: 72.09, r: 1220481, label: "Mauritius" },
          { x: 18200, y: 78.68, r: 396851, label: "Malta" },
        ],
      },
      {
        name: "America",
        data: [
          { x: 4800, y: 74.64, r: 6191368, label: "Paraguay" },
          { x: 4900, y: 70.92, r: 6587541, label: "El Salvador" },
          { x: 5600, y: 69.22, r: 2754430, label: "Peru" },
          { x: 5800, y: 74.06, r: 2501738, label: "Venezuela" },
          { x: 6300, y: 67.63, r: 8833634, label: "Dominican Republic" },
          { x: 6500, y: 67.43, r: 272945, label: "Belize" },
          { x: 6600, y: 71.43, r: 4231077, label: "Colombia" },
          { x: 6900, y: 72.14, r: 3000463, label: "Panama" },
          { x: 8100, y: 71.41, r: 78410118, label: "Brazil" },
          { x: 9600, y: 76.63, r: 3956507, label: "Costa Rica" },
          { x: 9600, y: 74.94, r: 4495959, label: "Mexico" },
          { x: 12400, y: 75.7, r: 6914475, label: "Argentina" },
          { x: 14500, y: 75.92, r: 3399237, label: "Uruguay" },
          { x: 16400, y: 71.64, r: 278289, label: "Barbados" },
          { x: 17700, y: 65.63, r: 299697, label: "Bahamas, The" },
          { x: 17700, y: 77.49, r: 3897960, label: "Puerto Rico" },
          { x: 31500, y: 79.96, r: 32507874, label: "Canada" },
          { x: 32100, y: 77.43, r: 89302754, label: "United States" },
        ],
      },
      {
        name: "Asia",
        data: [
          { x: 5600, y: 71.96, r: 92988000, label: "China" },
          { x: 5700, y: 61.29, r: 4863169, label: "Turkmenistan" },
          { x: 7700, y: 69.66, r: 19018924, label: "Iran" },
          { x: 7800, y: 66.07, r: 1514370, label: "Kazakhstan" },
          { x: 8100, y: 71.41, r: 14865523, label: "Thailand" },
          { x: 9700, y: 71.95, r: 23522482, label: "Malaysia" },
          { x: 12000, y: 75.23, r: 25795938, label: "Saudi Arabia" },
          { x: 13100, y: 72.85, r: 2903165, label: "Oman" },
          { x: 19200, y: 75.58, r: 48598170, label: "Korea, South" },
          { x: 19200, y: 73.98, r: 677886, label: "Bahrain" },
          { x: 20800, y: 79.17, r: 6199008, label: "Israel" },
          { x: 21300, y: 76.84, r: 2257549, label: "Kuwait" },
          { x: 23200, y: 73.4, r: 840290, label: "Qatar" },
          { x: 25200, y: 74.99, r: 2523915, label: "United Arab Emirates" },
          { x: 25300, y: 77.06, r: 22749838, label: "Taiwan" },
          { x: 27800, y: 81.53, r: 4353893, label: "Singapore" },
          { x: 29400, y: 81.04, r: 52733300, label: "Japan" },
          { x: 34200, y: 81.39, r: 6855125, label: "Hong Kong" },
        ],
      },
      {
        name: "Europe",
        data: [
          { x: 7700, y: 71.12, r: 2235555, label: "Romania" },
          { x: 8200, y: 71.75, r: 7517973, label: "Bulgaria" },
          { x: 9800, y: 66.39, r: 54378233, label: "Russia" },
          { x: 10700, y: 76.38, r: 1582395, label: "Chile" },
          { x: 11200, y: 74.14, r: 4496869, label: "Croatia" },
          { x: 11500, y: 70.86, r: 2306306, label: "Latvia" },
          { x: 12000, y: 74.16, r: 38626349, label: "Poland" },
          { x: 12500, y: 73.46, r: 3607899, label: "Lithuania" },
          { x: 14300, y: 71.38, r: 1341664, label: "Estonia" },
          { x: 14500, y: 74.19, r: 5423567, label: "Slovakia" },
          { x: 14900, y: 72.25, r: 1003237, label: "Hungary" },
          { x: 16800, y: 75.78, r: 1024617, label: "Czech Republic" },
          { x: 17900, y: 77.35, r: 1052414, label: "Portugal" },
          { x: 19600, y: 75.93, r: 2011473, label: "Slovenia" },
          { x: 21300, y: 78.94, r: 10647529, label: "Greece" },
          { x: 23300, y: 79.37, r: 40280780, label: "Spain" },
          { x: 27700, y: 79.54, r: 58057477, label: "Italy" },
          { x: 28400, y: 80.3, r: 898640, label: "Sweden" },
          { x: 28700, y: 78.54, r: 22424609, label: "Germany" },
          { x: 28700, y: 79.44, r: 30424213, label: "France" },
          { x: 29000, y: 78.24, r: 5214512, label: "Finland" },
          { x: 29500, y: 78.68, r: 16318199, label: "Netherlands" },
          { x: 29600, y: 78.27, r: 60270708, label: "United Kingdom" },
          { x: 30600, y: 78.44, r: 10348276, label: "Belgium" },
          { x: 31300, y: 78.87, r: 8174762, label: "Austria" },
          { x: 31900, y: 77.36, r: 3969558, label: "Ireland" },
          { x: 31900, y: 80.18, r: 293966, label: "Iceland" },
          { x: 32200, y: 77.44, r: 5413392, label: "Denmark" },
          { x: 33800, y: 80.31, r: 7450867, label: "Switzerland" },
        ],
      },
      {
        name: "Oceania",
        data: [
          { x: 2200, y: 64.56, r: 5420280, label: "Papua New Guinea" },
          { x: 2700, y: 61.32, r: 100798, label: "Kiribati" },
          { x: 5900, y: 69.2, r: 880874, label: "Fiji" },
          { x: 14500, y: 78.75, r: 108775, label: "Virgin Islands" },
          { x: 23200, y: 78.49, r: 1993817, label: "New Zealand" },
          { x: 30700, y: 80.26, r: 5991314, label: "Australia" },
        ],
      },
    ],
  }

  const options = {
    chart: {
      width: props.chartWidth,
      height: 380,
      title: "Life Expectancy per GDP",
      format: function (value, chartType, areaType, valueType) {
        if (valueType === "r" || valueType === "x") {
          if (valueType === "x") {
            value = "$" + value
          }
        }
        return value
      },
    },
    yAxis: {
      title: "Life Expectancy (years)",
    },
    xAxis: {
      title: "GDP",
    },
    tooltip: {
      template: function (category, items) {
        return (
          '<div class="tui-chart-default-tooltip">' +
          '<div class="tui-chart-tooltip-head">' +
          '<span class="tui-chart-legend-rect" style="' +
          items.cssText +
          '; width: 10px; height: 10px"></span>' +
          "<span>" +
          items.legend +
          "</span>" +
          "<span>" +
          items.label +
          "</span>" +
          "</div>" +
          '<table class="tui-chart-tooltip-body">' +
          "<tr>" +
          "<td>GDP</td>" +
          '<td class="tui-chart-tooltip-value">' +
          items.x +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Life Expectancy</td>" +
          '<td class="tui-chart-tooltip-value">' +
          items.y +
          "</td>" +
          "</tr>" +
          "<tr>" +
          "<td>Population</td>" +
          '<td class="tui-chart-tooltip-value">' +
          items.r +
          "</td>" +
          "</tr>" +
          "</table>" +
          "</div>"
        )
      },
    },
  }

  return <BubbleChart data={data} options={options} />
}
export default BubbleChartToast
