<script lang="ts">
    export let data

    $: weatherData = data.weatherData
    $: iconURL = weatherData ? `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}@2x.png`: ""

</script>

<div class="flex flex-col h-[90vh] mt-[35vh] gap-10 items-center w-full">
    <h1 class="h2">Frightful Weather Outside</h1>
    <form method="GET">
        <label for="city" class="label">Input City
            <input type="text" name="city" class="input mt-2" placeholder="Enter City Here">
        </label>
    </form>

    <div class="w-1/2 flex justify-center">
        {#if data.error}
            {data.error}
        {:else}
        <div class="card py-2 px-4 variant-soft-primary flex flex-col w-full items-center">
            <div class="flex items-center justify-center w-3/4 mb-2">
                <img src={iconURL} alt="icon for weather" class="size-10">
                <div class="mt-3">
                    <p class="h3">{weatherData.name}, {weatherData.sys.country}</p>
                    <p>{weatherData.weather[0].description}</p>
                </div>
            </div>
            <div class="w-full gap-10 grid grid-cols-3">
                <div class="my-2 py-2 px-2 border-dashed border-secondary-500 border-2 rounded-md">
                    <h2 class="h3 py-1">Temperature</h2>
                    <p>Current Temp: {weatherData.main.temp}</p>
                    <p>Feels Like: {weatherData.main.feels_like}</p>
                    <p>Min Temp: {weatherData.main.temp_min}</p>
                    <p>Max Temp: {weatherData.main.temp_max}</p>      
                </div>

                <div class="my-2 py-2 px-2 border-dashed border-secondary-500 border-2 rounded-md">
                    <h2 class="h3 py-1">Wind</h2>
                    <p>Wind Speed: {weatherData.wind.speed}</p>
                    <p>Wind Direction: {weatherData.wind.deg}</p>
                </div>

                <div class="my-2 py-2 px-2 border-dashed border-secondary-500 border-2 rounded-md">
                    <h2 class="h3 py-1">Sun Cycle</h2>
                    <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                    <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                </div>
            </div>

            
        </div>
            
        {/if}
    </div>
</div>