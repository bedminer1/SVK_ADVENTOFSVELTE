export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-sixteen.json')
    const presents = await response.json()

    return {
        presents
    }
}