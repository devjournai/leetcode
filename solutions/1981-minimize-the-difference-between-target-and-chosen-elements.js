/**
 * Minimize The Difference Between Target And Chosen Elements
 * Intuition: The problem involves finding all possible sums by picking one element from each row. This naturally suggests a dynamic programming approach where we maintain a set of all achievable sums at each step (after processing a certain number of rows).
 * Approach: 1. Initialize a `Set` called `currentSumsCollection` with `0` to represent the initial state before processing any rows. 2. Iterate through each `singleMatrixRow` in the input `mat`. 3. For each `singleMatrixRow`, create a new `Set` called `nextSumsCollection`. 4. Iterate through each `elementInCurrentRow` within the `singleMatrixRow`. 5. For each `existingSumElement` present in `currentSumsCollection`, calculate a `newlyCalculatedSum` by adding `existingSumElement` and `elementInCurrentRow`. 6. Add `newlyCalculatedSum` to `nextSumsCollection`. 7. After iterating through all elements in the current row and all existing sums, update `currentSumsCollection` to `nextSumsCollection` for the next iteration. 8. Once all rows have been processed, `currentSumsCollection` will contain every possible sum. 9. Initialize `overallMinimumDifference` to `Infinity`. 10. Iterate through each `finalSumCandidate` in `currentSumsCollection`. 11. Calculate the absolute difference between `finalSumCandidate` and the `target`, storing it in `currentDifferenceValue`. 12. Update `overallMinimumDifference` if `currentDifferenceValue` is smaller than the current minimum. 13. Return `overallMinimumDifference`.
 * Dry Run: mat = [[1,2,3],[4,5,6]], target = 10
 * 1. currentSumsCollection = {0}
 * 2. Process row [1,2,3]:
 *    nextSumsCollection = {}
 *    - For elementInCurrentRow = 1: newlyCalculatedSum = 0 + 1 = 1. nextSumsCollection.add(1).
 *    - For elementInCurrentRow = 2: newlyCalculatedSum = 0 + 2 = 2. nextSumsCollection.add(2).
 *    - For elementInCurrentRow = 3: newlyCalculatedSum = 0 + 3 = 3. nextSumsCollection.add(3).
 *    currentSumsCollection becomes {1, 2, 3}.
 * 3. Process row [4,5,6]:
 *    nextSumsCollection = {}
 *    - For elementInCurrentRow = 4:
 *      - existingSumElement = 1: newlyCalculatedSum = 1 + 4 = 5. nextSumsCollection.add(5).
 *      - existingSumElement = 2: newlyCalculatedSum = 2 + 4 = 6. nextSumsCollection.add(6).
 *      - existingSumElement = 3: newlyCalculatedSum = 3 + 4 = 7. nextSumsCollection.add(7).
 *    - For elementInCurrentRow = 5:
 *      - existingSumElement = 1: newlyCalculatedSum = 1 + 5 = 6. (already exists).
 *      - existingSumElement = 2: newlyCalculatedSum = 2 + 5 = 7. (already exists).
 *      - existingSumElement = 3: newlyCalculatedSum = 3 + 5 = 8. nextSumsCollection.add(8).
 *    - For elementInCurrentRow = 6:
 *      - existingSumElement = 1: newlyCalculatedSum = 1 + 6 = 7. (already exists).
 *      - existingSumElement = 2: newlyCalculatedSum = 2 + 6 = 8. (already exists).
 *      - existingSumElement = 3: newlyCalculatedSum = 3 + 6 = 9. nextSumsCollection.add(9).
 *    currentSumsCollection becomes {5, 6, 7, 8, 9}.
 * 4. All rows processed.
 *    overallMinimumDifference = Infinity.
 *    - For finalSumCandidate = 5: currentDifferenceValue = abs(5 - 10) = 5. overallMinimumDifference = 5.
 *    - For finalSumCandidate = 6: currentDifferenceValue = abs(6 - 10) = 4. overallMinimumDifference = 4.
 *    - For finalSumCandidate = 7: currentDifferenceValue = abs(7 - 10) = 3. overallMinimumDifference = 3.
 *    - For finalSumCandidate = 8: currentDifferenceValue = abs(8 - 10) = 2. overallMinimumDifference = 2.
 *    - For finalSumCandidate = 9: currentDifferenceValue = abs(9 - 10) = 1. overallMinimumDifference = 1.
 * 5. Return 1.
 * Time Complexity: O(m * n * (m * maxElementValue))
 * Space Complexity: O(m * maxElementValue)
 */
var minimizeTheDifference = function (mat, target) {
  let currentSumsCollection = new Set([0]);

  for (const singleMatrixRow of mat) {
    let nextSumsCollection = new Set();
    for (const elementInCurrentRow of singleMatrixRow) {
      for (const existingSumElement of currentSumsCollection) {
        let newlyCalculatedSum = existingSumElement + elementInCurrentRow;
        nextSumsCollection.add(newlyCalculatedSum);
      }
    }
    currentSumsCollection = nextSumsCollection;
  }

  let overallMinimumDifference = Infinity;
  for (const finalSumCandidate of currentSumsCollection) {
    let currentDifferenceValue = Math.abs(finalSumCandidate - target);
    overallMinimumDifference = Math.min(
      overallMinimumDifference,
      currentDifferenceValue,
    );
  }

  return overallMinimumDifference;
};
