<script lang="ts">
    export let data
    let count = 0

    let allBags: PresentGroup[] = []
    let bag: Present[] = []

    for (let present of data.presents) {
        // add present to bag
        if (count + present.weight < 100) {
            bag = [...bag, present]
            count += present.weight
        } else {
            allBags = [...allBags, {presents: bag, weight: count}]
            bag = []
            count = 0
        }
    }
    console.log(allBags)
</script>