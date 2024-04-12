import { SECRET_API_KEY } from '$env/static/private'

export const load = async ({ url, fetch }) => {
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
    const city = url.searchParams.get("city")

    if (!city) {
        return {
            error: 'Enter a City!'
        }
    }
    const URL = `${BASE_URL}?q=${city}&units=metric&appid=${SECRET_API_KEY}`
    
    try {
        const res = await fetch(URL)
        if (res.ok) {
            const weatherData = await res.json()
            return { weatherData, error: "" }
        } else if (res.status === 404) {
            return {
                error: `'${city}' could not be found :/`
            } 
        }
    } catch (err) {
        console.log(err)
        return { error: "500 Internal server error" }
    }
}