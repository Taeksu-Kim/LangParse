<template>
  <div style="height: 600px;">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
);

export default defineComponent({
  props: ['mbtiResult', 'scores'],
  setup(props) {
    const canvas = ref();

    onMounted(() => {
      const labels = ['E', 'I', 'N', 'S', 'T', 'F', 'J', 'P'];

      const backgroundColors = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ];

      const borderColors = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ];

      const datasets = labels.map((label, i) => ({
        label: label,
        data: [props.scores[label]],
        backgroundColor: backgroundColors[i],
        borderColor: borderColors[i],
        borderWidth: 1,
      }));

      const options = {
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${Math.abs(value)}%`;
              },
            },
          },
        },
        plugins: {
          datalabels: {
            color: '#000',
            anchor: 'end',
            align: 'start',
            formatter: function (value, context) {
              return context.dataset.label + ' ' + Math.abs(value) + '%';
            },
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label;
                return label + ' ' + Math.abs(context.raw) + '%';
              },
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      new Chart(canvas.value.getContext('2d'), {
        type: 'bar',
        data: { labels, datasets },
        options,
      });
    });

    return { canvas };
  },
});
</script>