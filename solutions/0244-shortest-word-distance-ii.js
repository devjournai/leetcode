/**
 * Shortest Word Distance II
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
