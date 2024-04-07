import { redirect } from '@sveltejs/kit'

export const load = async ({ fetch }) => {
    throw redirect(301, '/day5/v2')
    
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
    const data = await response.json()

    return {
        tasks: data
    }
}