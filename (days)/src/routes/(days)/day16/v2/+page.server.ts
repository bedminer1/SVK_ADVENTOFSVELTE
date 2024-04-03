export const load = async ({ fetch }) => {
    const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-sixteen.json')
    const presents: AmazonPresent[] = await response.json()

    let presents3D: Present3D[] = []
    let slots = new Map()
    for (const p of presents) {
        let currSlot =`${p.x},${p.y}` 
        slots.set(currSlot, (slots.get(currSlot) ?? 0) + 1)
        presents3D.push({ ...p, z: slots.get(currSlot) })
    }
    return {
        presents3D
    }
}