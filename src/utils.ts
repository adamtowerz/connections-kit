export function arraysContainSameStrings(arr1: string[], arr2: string[]) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    return arr1.every(el => set2.has(el)) && arr2.every(el => set1.has(el))
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle<T>(arr: T[]): T[] {
  const array = [...arr];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}