export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json')
    const data = await response.json()

    return {
        children: data
    }
}