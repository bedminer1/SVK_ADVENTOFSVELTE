export const load = async ({ fetch }) => {
    const response = await fetch("https://advent.sveltesociety.dev/data/2023/day-twenty-three.json")
    const elfPosts: ElfPost[] = await response.json()
    
    return {
        elfPosts
    }
}