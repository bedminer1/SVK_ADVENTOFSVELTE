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
    <form class="flex flex-col items-center">
        <input type="text" class="input w-full rounded-md mb-4" placeholder="first and last name" bind:value={inputName}>
    </form>
    
    <!-- <p class="text-lg">Elf Name: {firstName + ' ' + lastName}</p> -->
    <div class="mt-5 text-2xl">
      {#if firstName && lastName}
        <p in:fly={{ x: -20, duration: 400 }} class="mb-3">Your <em>elf</em> name is:</p>
        <div class="relative">
          {#key firstName}
            <div class="text-4xl md:text-5xl">
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
