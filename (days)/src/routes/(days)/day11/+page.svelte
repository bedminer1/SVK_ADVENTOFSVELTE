<script lang="ts">
  import { encode } from '$lib/utils/encode'

  export let data

  let inputName: string = ''

  // ENCODE takes in a name and returns a randomized elf name
  $: elfName = encode(inputName, data.names)
    

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
