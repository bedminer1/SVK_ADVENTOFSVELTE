export const load = async ({ fetch }) => {
  const response = await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json');
  const children = await response.json()
  children.sort((a: Child, b: Child) => a.tally - b.tally)

  return {
    children
  }
};
