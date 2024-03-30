export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-thirteen.json')
    const presents: Present[] = await response.json()

    return {
        presents
    }
}