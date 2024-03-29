<script lang="ts">
    let count = 0
    $: increment = () => {
        if (count < 100) count++
    }
    $: decrement = () => {
        if (count > 0) count--
    }
    $: reset = () => {
        count = 0
    }

    function handleKeydown(key: string) {
        if (key === ' ') {
           increment()
        }
        else if (key === 'q') {
            decrement()
        }
    }

    $: cookieJar = getCookieJar(count)

    function getCookieJar(count: number) {
        let res = []
        for (let i = 0; i < count; i++) res.push('🍪')
        return res.join('')
    }
</script> 

<div class="flex flex-col justify-center items-center text-xl">
    <p>Press <i>'Q'</i> to take away cookies and <i>Spacebar</i> to give cookies</p>
    <div>
        {count}
    </div>
    <button on:click={reset}>Eat Cookies</button>
    <h2>Cookie Jar:</h2>
    <div class="w-56 border-2 border-t-0 mt-6">
        <p>
            {cookieJar}
        </p>
    </div>
</div>
<svelte:window on:keypress={(event) => {
    handleKeydown(event.key)
}}/>