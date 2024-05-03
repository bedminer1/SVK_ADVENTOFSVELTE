<script lang="ts">
    import Header from "./Header.svelte";

    export let texts: text[] = []
</script>

<div class="flex flex-col items-start w-1/2 border-dashed border-2 p-3 rounded-lg mb-6">
    {#each texts as text}
        <div class="w-full">
            {#if texts.indexOf(text) === 0}
                <Header {text} />
            {:else if texts.length > 1 && texts[texts.indexOf(text) - 1].author === text.author} 
                <span></span>
            {:else}
                <hr class="my-2 w-1/2">
                <Header {text} />
            {/if}
            <p>{text.body}</p>
        </div>
    {/each}
</div>