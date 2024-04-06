export function timeToSeconds(time: string): number {
    const timeArr = time.split(':')
    let output: number = 0
    output += Number(timeArr[0]) * 60 * 60
    output += Number(timeArr[1]) * 60
    output += Number(timeArr[2])
    return output
}