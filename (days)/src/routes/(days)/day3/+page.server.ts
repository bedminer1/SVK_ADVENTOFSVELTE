export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-three.json')
    const data = await response.json()
    let children: Present[] = []
    for (let child of data) {
        child = {
            ...child,
            weight: child.weight.toFixed(2),
            added: false
        }
        children.push(child)
    }


    return {
        children
    }
}