/**
 * Find The Distance Value Between Two Arrays
 * Intuition: Count how many arr1 values have no arr2 neighbor within distance d. Binary search on a sorted arr2 quickly finds whether any value lies in [x-d, x+d].
 * Approach: 1. Sort a copy of arr2. 2. For each x in arr1, binary search: if |x - arr2[mid]| <= d, x is disqualified; else move left/right depending on arr2[mid] vs x. 3. Increment the answer when no close neighbor exists.
 * Dry Run: arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2.
 *   - Sorted arr2 = [1,8,9,10]. 4 is far from all; 5 is far; 8 is within 2 of 8/9/10. Count = 2.
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
        leftPointer + (rightPointer - leftPointer) / 2
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
