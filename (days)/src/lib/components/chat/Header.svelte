<script lang="ts">
    export let text: text
</script>

<div class="flex justify-between">
    <p><b>{text.author}</b></p>
    <p><i>{text.time.toLocaleDateString()} | {text.time.toLocaleTimeString().slice(0,5)}</i></p>
</div>