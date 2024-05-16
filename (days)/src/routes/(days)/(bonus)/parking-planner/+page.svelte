<script lang="ts">
    interface Car {
        id: number
    }

    let queue: Car[] = []
    let parkingLot: Car[] = []
    for (let id = 0; id < 10; id++) {
        queue = [...queue, {id: id}]
    }

    function skipCar() {
        
    }

    for (let days = 1; days <= 7; days++) { // 1  indexed days
        while (parkingLot.length > 0) { // unloading cars from parking lot
            queue = [...queue, parkingLot.shift()!]
        }


        while (parkingLot.length < 5) { // loading cars to parking lot
            parkingLot = [...parkingLot, queue.shift()!]
        }
        console.log(parkingLot)
    }

</script>