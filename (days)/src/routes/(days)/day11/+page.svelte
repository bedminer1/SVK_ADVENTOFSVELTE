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
        if (!inputName.includes(' ')) return '*include a first and a last name*'

        const [firstName, lastName] = inputName.split(' ')
        const newName: string[] = [data.names.firstNames[hash(firstName) * hash(lastName) % 59], data.names.lastNames[(hash(lastName) * hash(firstName)) % 59]]
        return newName.join(' ')
    }

    $: elfName = encode(inputName)
    

</script>

<div class="flex flex-col items-center justify-center h-[80vh]">

    <form class="flex flex-col items-center">
        <input type="text" class="input w-full" bind:value={inputName}>
    </form>
    
    <p>output: {elfName}</p>
</div>
