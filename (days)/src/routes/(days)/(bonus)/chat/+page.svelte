<script lang="ts">
    import { superForm } from 'sveltekit-superforms'
    import ChatDisplay from '$lib/components/chat/ChatDisplay.svelte';
    
    export let data

    const { form, errors, message, capture, restore, enhance} = superForm(data.form, {
        resetForm: false
    })
    export const snapshot = { capture, restore }
    
    let texts: text[] = []
    $form.time = new Date()

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
        <ChatDisplay {texts} />
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
        <input type="hidden" name="time" bind:value={$form.time}>
        <button></button>
    </form>
</div>