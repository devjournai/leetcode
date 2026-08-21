/**
 * Array Transformation
 * Intuition: Interior values only change when they sit strictly below or above both neighbors, so the array evolves toward a locally monotone shape. Simulating one simultaneous snapshot at a time is enough because each change is independent of the others in that round.
 * Approach: 1. If the array has at most two elements, return it unchanged. 2. Copy the array into currentArraySnapshot. 3. Repeat: copy a nextArraySnapshot, then for every interior index compare the center with left and right neighbors from the previous snapshot. 4. If the center is a strict valley, increment it; if it is a strict peak, decrement it; set hasArrayChangedIndicator when any cell changes. 5. Replace the current snapshot and stop when a round makes no changes. 6. Return the stable array.
 * Dry Run: arr = [6,2,3,4]
 *   length > 2. currentArraySnapshot = [6,2,3,4]
 *   Round 1: index 1: 2 < 6 and 2 < 3 -> 3. index 2: 3 vs 2 and 4, neither peak nor valley. next = [6,3,3,4], changed.
 *   Round 2: index 1: 3 < 6 but 3 == 3, no. index 2: 3 vs 3 and 4, no. unchanged.
 *   Return [6,3,3,4].
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
