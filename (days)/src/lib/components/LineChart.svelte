<script lang="ts">
    import { Line } from 'svelte-chartjs';
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      CategoryScale
    );

    export let data: LineDataSet
  </script>
  
  <Line 
    {data} 
    width={5}
    height={4}
    options={{ 
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#DCC7EA'
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    color: '#DCC7EA'
                }
            },
            x: {
                ticks: {
                    color: '#DCC7EA'
                }
            }
        },
    }} />