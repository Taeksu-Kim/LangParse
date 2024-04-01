<template>
  <div class="pie-container">
    <div class="pie-wrapper">
      <canvas ref="firstPie" class="pie-chart"></canvas>
    </div>
    <div class="pie-wrapper">
      <canvas ref="secondPie" class="pie-chart"></canvas>
    </div>
    <div class="pie-wrapper">
      <canvas ref="thirdPie" class="pie-chart"></canvas>
    </div>
    <div class="pie-wrapper">
      <canvas ref="fourthPie" class="pie-chart"></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Chart, DoughnutController, ArcElement, Legend, Tooltip } from "chart.js";

Chart.register(DoughnutController, ArcElement, Legend, Tooltip);

export default defineComponent({
  props: ["mbtiResult", "scores"],
  setup(props) {
    const firstPie = ref();
    const secondPie = ref();
    const thirdPie = ref();
    const fourthPie = ref();

    const createPieChart = (canvas, labels, data, colors) => {
      return new Chart(canvas.value.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: colors,
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                generateLabels: function (chart) {
                  const original = Chart.overrides.doughnut.plugins.legend.labels.generateLabels;
                  const labels = original.call(this, chart);
                  labels.reverse();
                  return labels;
                },
              },
            },
          },
        },
      });
    };

    const sortPieData = (labels, data, colors) => {
      const dataArray = labels.map((label, i) => ({
        label: `${label}: ${Math.round(data[i])}%`,
        data: data[i],
        color: colors[i]
      }));

      dataArray.sort((a, b) => a.data - b.data);

      return {
        labels: dataArray.map(item => item.label),
        data: dataArray.map(item => item.data),
        colors: dataArray.map(item => item.color)
      };
    };

    onMounted(() => {
      const pieColors = [
        ["rgba(255, 99, 132, 0.6)", "rgba(255, 99, 132, 0.3)"],
        ["rgba(54, 162, 235, 0.6)", "rgba(54, 162, 235, 0.3)"],
        ["rgba(255, 206, 86, 0.6)", "rgba(255, 206, 86, 0.3)"],
        ["rgba(75, 192, 192, 0.6)", "rgba(75, 192, 192, 0.3)"],
      ];

      const {labels: labels1, data: data1, colors: colors1} = sortPieData(["E", "I"], [props.scores["E"], props.scores["I"]], pieColors[0]);
      createPieChart(firstPie, labels1, data1, colors1);

      const {labels: labels2, data: data2, colors: colors2} = sortPieData(["N", "S"], [props.scores["N"], props.scores["S"]], pieColors[1]);
      createPieChart(secondPie, labels2, data2, colors2);

      const {labels: labels3, data: data3, colors: colors3} = sortPieData(["T", "F"], [props.scores["T"], props.scores["F"]], pieColors[2]);
      createPieChart(thirdPie, labels3, data3, colors3);

      const {labels: labels4, data: data4, colors: colors4} = sortPieData(["J", "P"], [props.scores["J"], props.scores["P"]], pieColors[3]);
      createPieChart(fourthPie, labels4, data4, colors4);

    });

    return { firstPie, secondPie, thirdPie, fourthPie };
  },
});
</script>

<style scoped>
.pie-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pie-wrapper {
  width: 50%;
  padding-top: 50%; /* Aspect ratio 1:1 */
  position: relative;
}

.pie-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (min-width: 600px) {
  .pie-wrapper {
    width: 25%;
    padding-top: 25%;
  }
}
</style>