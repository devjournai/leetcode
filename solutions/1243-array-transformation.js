/**
 * Array Transformation
 * Time Complexity: O(N^2 * MaxVal)
 * Space Complexity: O(N)
 */
var transformArray = function (arr) {
  if (arr.length <= 2) {
    return arr;
  }

  let currentArraySnapshot = [...arr];
  let hasArrayChangedIndicator;

  do {
    hasArrayChangedIndicator = false;
    let nextArraySnapshot = [...currentArraySnapshot];

    for (
      let iterationIndex = 1;
      iterationIndex < currentArraySnapshot.length - 1;
      iterationIndex++
    ) {
      let leftNeighborElement = currentArraySnapshot[iterationIndex - 1];
      let centerElement = currentArraySnapshot[iterationIndex];
      let rightNeighborElement = currentArraySnapshot[iterationIndex + 1];

      if (
        centerElement < leftNeighborElement &&
        centerElement < rightNeighborElement
      ) {
        nextArraySnapshot[iterationIndex] = centerElement + 1;
        hasArrayChangedIndicator = true;
      } else if (
        centerElement > leftNeighborElement &&
        centerElement > rightNeighborElement
      ) {
        nextArraySnapshot[iterationIndex] = centerElement - 1;
        hasArrayChangedIndicator = true;
      }
    }
    currentArraySnapshot = nextArraySnapshot;
  } while (hasArrayChangedIndicator);

  return currentArraySnapshot;
};
