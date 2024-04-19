export function encode(inputName: string, names: { firstNames: string[], lastNames: string[]}): string {
    if (!inputName.includes(' ')) return '*please input valid name*'

    const [firstName, lastName] = inputName.split(' ')
    if (lastName.length < 1) return '*please input valid name*'

    const newName: string[] = [names.firstNames[hash(firstName) * hash(lastName) % 59], names.lastNames[(hash(lastName) * hash(firstName)) % 59]]
    return newName.join(' ')
}

function hash(key: string): number {
    let hashKey = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashKey += key.charCodeAt(i) * prime;
    }
    return hashKey % 59;
  }