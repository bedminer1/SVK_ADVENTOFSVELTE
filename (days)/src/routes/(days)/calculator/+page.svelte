<script lang="ts">
    import GarbageText from '$lib/components/GarbageText.svelte'


    let input: string = "3+(4+2*2)*2"
    
    // use a stack to parse the string
    let stack: string[]
    
    let finalResult: number
    $: {
        stack = []
        // first loop through to take care of brackets
        for (let i = 0; i < input.length; i++) {
            const c = input[i]
        // upon close bracket, resolve inside the bracket
            if (c === ")") {
                let j = i
                const innerStack: string[] = []
                while (input[j] !== "(") {
                    innerStack.push(stack.pop()!)
                    j--
                }
    
                innerStack.pop() // eject extra open bracket
                const res = resolve(innerStack)
                stack.push(res.toString())
                continue
            }
        
            stack.push(c)
        }
        finalResult = resolve(stack)
    }

    // resolve takes in a stack without brackets and resolves it
   function resolve(stack: string[]): number {
    // saving add(and subtract) in a stack, resolving multiply and divide first
       const addStack: string[] = []

           for (let i = 0; i < stack.length; i++) {
               const c = stack[i]
            //    if character is "*" or "/"
               if (c === "*") {
                // perform operation on numbers adjacent to operator, add result to addStack
                   addStack.push((Number(addStack.pop()) * Number(stack[i + 1])).toString())
                   i++ // number after operator 'used'
                   continue
               }
               if (c === "/") {
                   addStack.push((Number(addStack.pop()) / Number(stack[i + 1])).toString())
                   i++
                   continue
               }
               addStack.push(c)
           }

       return resolveAddSubtract(addStack)
   }

   // resolveAddSubtract takes a given stack and resolves addition and subtraction operations
    function resolveAddSubtract(stack: string[]): number {
        let res = Number(stack[0])
        for (let i = 1; i < stack.length; i++) {
            if (stack[i] === "+") {
                res += Number(stack[i + 1])
            }
            if (stack[i] === "-") {
                res -= Number(stack[i + 1])
            }
        }

        return res
    }

    
    
// add/minus done in a one pass for loop
</script>

<div class="flex justify-center w-full h-[90vh] items-center">
    <div class="flex flex-col items-center">
        <input type="text" class="input variant-soft-primary rounded-lg mb-8 text-3xl" bind:value={input} placeholder="eg. 3+(4+2*2)*2">
        {#if isNaN(finalResult)}
            <h1 class="h2">Not a valid input :/ </h1>
        {:else}
            <p class="h2"><GarbageText originalText={finalResult.toString()} /></p>
        {/if}
    </div>
</div>
