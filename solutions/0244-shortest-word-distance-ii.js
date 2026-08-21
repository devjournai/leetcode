/**
 * Shortest Word Distance II
 * Intuition: Precompute every word’s sorted index list. A shortest query then merges two increasing lists with two pointers, always advancing the smaller index to try a closer pair.
 * Approach: 1. Constructor: map each word to the list of positions it appears at. 2. `shortest`: load both index lists. 3. While both pointers are in range, update `smallestDistance` with `|valueA - valueB|`. 4. Increment the pointer at the smaller index. 5. Return `smallestDistance`.
 * Dry Run: words = ["a","b","a","c"]; query "a","c".
 *   - Map: a→[0,2], c→[3]. Compare |0-3|=3 then advance A; |2-3|=1 then advance A. Return 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var WordDistance = function (wordsInput) {
  this.indexMap = new Map();
  const collectionLength = wordsInput.length;

  for (let loopIndex = 0; loopIndex < collectionLength; loopIndex++) {
    const currentWordEntry = wordsInput[loopIndex];
    if (!this.indexMap.has(currentWordEntry)) {
      this.indexMap.set(currentWordEntry, []);
    }
    this.indexMap.get(currentWordEntry).push(loopIndex);
  }
};

WordDistance.prototype.shortest = function (firstWordQuery, secondWordQuery) {
  const listOneIndices = this.indexMap.get(firstWordQuery);
  const listTwoIndices = this.indexMap.get(secondWordQuery);
  let smallestDistance = Infinity;
  let ptrA = 0;
  let ptrB = 0;

  while (ptrA < listOneIndices.length && ptrB < listTwoIndices.length) {
    const valueA = listOneIndices[ptrA];
    const valueB = listTwoIndices[ptrB];
    const currentDifference = Math.abs(valueA - valueB);
    smallestDistance = Math.min(smallestDistance, currentDifference);

    if (valueA < valueB) {
      ptrA++;
    } else {
      ptrB++;
    }
  }

  return smallestDistance;
};
