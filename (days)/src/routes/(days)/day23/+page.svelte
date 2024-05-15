<script lang="ts">
    import { timeToSeconds } from '$lib/utils/timeConverter'

    export let data

    let posts = data.elfPosts
    let postedPosts: ElfPost[] = []
    $: displayedPosts = postedPosts.reverse()

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
<div class="flex flex-col w-full items-center">
    {#each displayedPosts as post}
    <div class="flex flex-col w-1/2 mb-9">
        <div class="border-2 border-dashed rounded-xl p-3 mb-7">
            <div class="text-2xl mb-4">
                <p>{post.author}</p>
            </div>
            <div class="mb-3">
                <p>{post.content}</p>
            </div>
            <div class="w-full flex justify-between">
                <p>{post.likes} likes</p>
                <p>{post.timestamp.substring(0, 10)} | {post.timestamp.substring(11)}</p>
            </div>
        </div>
        <div>
            {#each post.comments as comment}
            {#if timeToSeconds(comment.timestamp.slice(11, 19)) < currSeconds}   
            <div class="flex flex-col w-2/3 mb-9 pl-5 ml-5 border-l-2 border-dashed">
                <div class="w-full flex justify-between text-lg mb-4">
                    <p>{comment.author}</p>
                    <p>{comment.timestamp.substring(0, 10)} | {comment.timestamp.substring(11)}</p>
                </div>
                <div>
                    <p>{comment.content}</p>
                </div>
            </div>
            {/if}
            {/each}
        </div>
    </div>
        
    {/each}
</div>