<script lang="ts">
  import { onMount } from "svelte";

    let showPopup = false
    let popupShown = false

    function closePopup() {
        showPopup = false
        popupShown = true
    }

    onMount(() => setTimeout(() => {
        showPopup = true
    }, 1000))
</script>

<div class="w-full flex flex-col justify-center items-center h-[80vh]">
{#if showPopup} 
    <div class="card p-5 rounded-sm variant-filled-primary">
        <p>hi</p>
        <button on:click={() => closePopup()}>close</button>
    </div>
{:else if popupShown}
    <p>nothing left..</p>
{:else}
    <p>wait...</p>
{/if}
</div>