<script lang="ts">
    import { Bar } from 'svelte-chartjs';
    import {
      Chart,
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale,
    } from 'chart.js';
  
    Chart.register(
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale
    );

    export let data: dataSet
  </script>
  
  <Bar 
  {data} 
  width={1}
  height={1}
  options={{
        // animation: false 
        }}/>
