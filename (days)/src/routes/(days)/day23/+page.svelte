<script lang="ts">
    import { timeToSeconds } from '$lib/utils/timeConverter'

    export let data

    let posts = data.elfPosts
    let postedPosts: ElfPost[] = []

    // filter by time
    let time = new Date().toLocaleTimeString()
    $: currSeconds = timeToSeconds(time)
    // keep track of index of last completed task for caching
    let lastIndex = 0

    setInterval(() => {
        // update the time
        time = new Date().toLocaleTimeString()

        // iterate through and all posts done before 'now' is added
        for (let i = lastIndex + 1; i < posts.length; i++) {
            let post = posts[i]
            if (timeToSeconds(post.timestamp.slice(11, 19)) < currSeconds) {
                postedPosts = [...postedPosts, post]
                lastIndex = i
            } 
            // stops from doing unneeded iterations
           else break
        }
    }, 5000) // check every 5 seconds


</script>

<p>{JSON.stringify(postedPosts)}</p>