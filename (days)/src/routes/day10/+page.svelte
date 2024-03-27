<script lang="ts">
  import { onMount } from "svelte";

    let showPopup = true

    function closePopup() {
        showPopup = false
    }
</script>

<div class="w-full flex flex-col justify-center items-center h-[80vh]">
{#if showPopup} 
    <div class="card p-5 rounded-sm variant-filled-primary">
        <p>hi</p>
        <button on:click={() => showPopup = false}>close</button>
    </div>
{:else}
    <button on:click={() => showPopup = true}>show</button>
{/if}
</div>