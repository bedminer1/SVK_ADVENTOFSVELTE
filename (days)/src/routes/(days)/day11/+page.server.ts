export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-eleven.json')
    const names: NamesList = await response.json()

    return {
        names
    }
}