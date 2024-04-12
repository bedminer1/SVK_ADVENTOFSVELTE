<script lang="ts">
    export let data

    $: weatherData = data.weatherData
    $: iconURL = weatherData ? `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`: ""
</script>

<div>
    <form method="GET">
        <label for="city" class="label">Input City
            <input type="text" name="city" class="input" placeholder="Enter City Here">
        </label>
    </form>

    <div>
        {#if data.error}
            {data.error}
        {:else}
            <p>{weatherData.main.temp}</p>
            <p>{weatherData.main.temp_min}</p>
            <p>{weatherData.main.temp_max}</p>
            <p>{weatherData.weather[0].main}</p>
            <img src={iconURL} alt="icon for weather">
        {/if}
    </div>
</div>