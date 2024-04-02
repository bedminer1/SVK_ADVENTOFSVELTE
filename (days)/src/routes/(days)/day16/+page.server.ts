export const load = async ({ fetch }) => {
  const response = await fetch(
    "https://advent.sveltesociety.dev/data/2023/day-sixteen.json"
  );
  const presents: AmazonPresent[] = await response.json();
  let grid :AmazonPresent[][][] = Array(21);
  for (let r = 0; r < 21; r++) {
    grid[r] = new Array
  }

  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
        grid[r][c] = new Array()
    }
  }

  
  for (const present of presents) {
      grid[present.x][present.y].push(present)
    }
    

  return {
    presents,
    grid,
  };
};
