/**
 * Find The Distance Value Between Two Arrays
 * Time Complexity: O(M log M + N log M)
 * Space Complexity: O(M)
 */
var findTheDistanceValue = function (arr1, arr2, d) {
  let qualifyingElementCount = 0;
  let sortedSecondArray = arr2.slice().sort((valX, valY) => valX - valY);

  for (const primaryValue of arr1) {
    let hasCloseNeighbor = false;
    let leftPointer = 0;
    let rightPointer = sortedSecondArray.length - 1;

    while (leftPointer <= rightPointer) {
      let middleIndex = Math.floor(
        leftPointer + (rightPointer - leftPointer) / 2,
      );
      let neighboringValue = sortedSecondArray[middleIndex];

      if (Math.abs(primaryValue - neighboringValue) <= d) {
        hasCloseNeighbor = true;
        break;
      } else if (neighboringValue < primaryValue) {
        leftPointer = middleIndex + 1;
      } else {
        rightPointer = middleIndex - 1;
      }
    }

    if (!hasCloseNeighbor) {
      qualifyingElementCount++;
    }
  }

  return qualifyingElementCount;
};
