<script lang="ts">
    import { superForm } from 'sveltekit-superforms'
    
    export let data


    const { form, errors, message, capture, restore, enhance} = superForm(data.form, {
        resetForm: true
    })
    export const snapshot = { capture, restore }
    
    let texts: text[] = []

    function handleSubmit() {
        if ($form.body.length === 0 || $form.author.length === 0) return
        if (texts.length > 20) {
            texts.shift()
        }
        $form.time = new Date()
        const newText: text = {
            author: $form.author,
            body: $form.body,
            time: $form.time
        }

        texts = [...texts, newText]
    }
</script>

<div class="flex w-full h-[90vh] justify-center items-center flex-col">
    {#if texts.length}     
    <div class="flex flex-col items-start w-1/2 border-dashed border-2 p-3 rounded-lg mb-6">
        {#each texts as text}
            <div class="w-full">
                {#if texts.indexOf(text) === 0}
                    <div class="flex justify-between">
                        <p><b>{text.author}</b></p>
                        <p><i>{text.time.toLocaleDateString()} | {text.time.toLocaleTimeString().slice(0,5)}</i></p>
                    </div>
                {:else if texts.length > 1 && texts[texts.indexOf(text) - 1].author === text.author} 
                    <span></span>
                {:else}
                <hr class="my-2 w-1/2">
                    <div class="flex justify-between">
                        <p>{text.author}</p>
                        <p><i>{text.time.toLocaleDateString()} | {text.time.toLocaleTimeString().slice(0,5)}</i></p>
                    </div>
                {/if}
                <p>{text.body}</p>
            </div>
        {/each}
    </div>
    {/if}
    
    <form action="?/send" method="POST" class="flex flex-col w-2/5 gap-2" on:submit={handleSubmit} use:enhance>
        <input type="text" class="input variant-ghost-primary rounded-lg" name="author" bind:value={$form.author} placeholder="Enter User">
        {#if $errors.author}
            <p><i>Please enter a user</i></p>
        {/if}
        <input class="input variant-ghost-primary rounded-lg" name="body" type="text" bind:value={$form.body} placeholder="Enter Message">
        {#if $errors.body}
            <p><i>Please enter a message</i></p>
        {/if}
        <button></button>
    </form>
</div>