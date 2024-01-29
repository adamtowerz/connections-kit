export function arraysContainSameStrings(arr1: string[], arr2: string[]) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const set1 = new Set(arr1);
    const set2 = new Set(arr2);

    return arr1.every(el => set2.has(el)) && arr2.every(el => set1.has(el))
}