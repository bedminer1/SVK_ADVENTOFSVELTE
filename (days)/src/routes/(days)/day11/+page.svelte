<script lang="ts">
    export let data

    let inputName: string = ''

    function hash(key: string): number {
    let hashKey = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashKey += key.charCodeAt(i) * prime;
    }
    return hashKey % 59;
  }

    function encode(inputName: string): string {
        if (!inputName.includes(' ')) return '*please input valid name*'

        const [firstName, lastName] = inputName.split(' ')
        const newName: string[] = [data.names.firstNames[hash(firstName) * hash(lastName) % 59], data.names.lastNames[(hash(lastName) * hash(firstName)) % 59]]
        return newName.join(' ')
    }

    $: elfName = encode(inputName)
    

</script>

<div class="flex flex-col items-center justify-center h-[80vh]">
  <h1 class="h1 mb-8">
    Elf Name Generator
  </h1>
    <form class="flex flex-col items-center">
        <input type="text" class="input w-full rounded-md mb-4" placeholder="first and last name" bind:value={inputName}>
    </form>
    
    <p class="text-lg">Elf Name: {elfName}</p>
</div>
