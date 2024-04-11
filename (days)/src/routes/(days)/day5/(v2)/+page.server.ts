import { error } from '@sveltejs/kit'

export const load = async ({ fetch }) => {

    try {
        const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-five.json')
        const data = await response.json()

        return {
            tasks: data
        }
    } catch (err) {
        error(401, {
            message: 'Cannot connect to server'
        })
    }
   
}