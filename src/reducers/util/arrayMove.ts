
/**
 * Moves an array of elements from one index to another
 * 
 * @param array The array to move elements in
 * @param range The range of elements to move (from..<to)
 * @param targetIndex The index to move the elements to
 * @returns The new array with the elements moved
 */
export const arrayMove = <T>(array: T[], range: { from: number, to: number }, targetIndex: number): T[] => {
    let newArray = [...array];
    const movingElements = newArray.slice(range.from, range.to);
    
    newArray.splice(range.from, range.to - range.from);

    if (targetIndex > range.from) {
        targetIndex -= movingElements.length - 1;
    }

    newArray.splice(targetIndex, 0, ...movingElements);

    return newArray;
};