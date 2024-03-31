export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-eighteen.json')
    const quiz: Question[] = await response.json()

    return {
        quiz
    }
}