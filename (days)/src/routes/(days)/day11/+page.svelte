<script lang="ts">
  import { encode } from '$lib/utils/encode'
  import { fly } from 'svelte/transition'
  import GarbageText from '$lib/components/GarbageText.svelte'

  export let data

  let inputName: string = ''

  // ENCODE takes in a name and returns a randomized elf name
  $: [firstName, lastName] = encode(inputName, data.names)
    

</script>

<div class="flex flex-col items-center justify-center h-[80vh]">
  <h1 class="h1 mb-8">
    Elf Name Generator
  </h1>
    <form class="flex flex-col items-center w-2/3">
      <label class="label flex gap-3 items-center">
        <span>Name: </span>
        <input type="text" class="input w-full rounded-md mb-4" placeholder="first and last name" bind:value={inputName}>
      </label>
    </form>
    
    <div class="mt-3 text-xl w-2/3 p-4">
      {#if firstName && lastName}
        <p in:fly={{ x: -20, duration: 400 }} class="mb-3">Your <em>elf</em> name is:</p>
        <div class="relative">
          {#key firstName}
            <div class="text-lg md:text-xl">
              <span class="names text-primary">
                <GarbageText originalText={firstName} />
              </span>
              <br />
              <span class="names text-accent">
                <GarbageText originalText={lastName} />
              </span>
            </div>
          {/key}
        </div>
      {/if}
    </div>
</div>
