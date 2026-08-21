/**
 * Find The Index Of The Large Integer
 * Intuition: Exactly one index is larger. compareSub on equal-length halves locates which side (or the middle when n is odd) holds the peak.
 * Approach: 1. Binary search [start,end]. 2. Odd length: compare left of mid vs right of mid; 0 means mid is the large one. 3. Even: compare including mid vs the right half. 4. Shrink.
 * Dry Run: conceptual array [0,0,1,0], n = 4.
 *   - Even compare of [0,1] vs [2,3] prefers the right → index 2.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var getIndex = function (reader) {
  const arraySize = reader.length();
  let startIndex = 0;
  let endIndex = arraySize - 1;

  while (startIndex < endIndex) {
    const currentRange = endIndex - startIndex + 1;
    const middlePoint = Math.floor((startIndex + endIndex) / 2);

    if (currentRange % 2 === 1) {
      const comparisonResultA = reader.compareSub(
        startIndex,
        middlePoint - 1,
        middlePoint + 1,
        endIndex
      );
      if (comparisonResultA === 0) {
        return middlePoint;
      } else if (comparisonResultA === 1) {
        endIndex = middlePoint - 1;
      } else {
        startIndex = middlePoint + 1;
      }
    } else {
      const comparisonResultB = reader.compareSub(
        startIndex,
        middlePoint,
        middlePoint + 1,
        endIndex
      );
      if (comparisonResultB === 1) {
        endIndex = middlePoint;
      } else {
        startIndex = middlePoint + 1;
      }
    }
  }

  return startIndex;
};
