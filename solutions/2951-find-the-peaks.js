/**
 * Find The Peaks
 * Intuition: A peak is a point strictly higher than both its immediate neighbors. We can identify these by iterating through the array and comparing each element with its left and right adjacent values. The problem statement excludes the first and last elements from being peaks, which simplifies the iteration range.
 * Approach: 1. Initialize an empty array `peakIndicesResult` to store the indices of identified peaks. 2. Determine `totalElements`, the length of the input `mountain` array. 3. Iterate with `elementIndex` from 1 (the second element) up to `totalElements - 2` (the second-to-last element), as the first and last elements cannot be peaks. 4. Inside the loop, retrieve `currentValue` at `mountain[elementIndex]`, `leftNeighbor` at `mountain[elementIndex - 1]`, and `rightNeighbor` at `mountain[elementIndex + 1]`. 5. Check if `currentValue` is strictly greater than both `leftNeighbor` AND `rightNeighbor`. 6. If the condition is met, add the `elementIndex` to `peakIndicesResult`. 7. After the loop completes, return `peakIndicesResult`.
 * Dry Run: mountain = [2, 4, 3, 5, 1, 6]
 *   1. `peakIndicesResult = []`
 *   2. `totalElements = 6`
 *   3. Loop `elementIndex` from 1 to `totalElements - 2` (i.e., 1 to 4):
 *      - `elementIndex = 1`:
 *        - `currentValue = mountain[1]` (4)
 *        - `leftNeighbor = mountain[0]` (2)
 *        - `rightNeighbor = mountain[2]` (3)
 *        - Is `4 > 2` AND `4 > 3`? Yes (true && true).
 *        - `peakIndicesResult.push(1)`. `peakIndicesResult` becomes `[1]`.
 *      - `elementIndex = 2`:
 *        - `currentValue = mountain[2]` (3)
 *        - `leftNeighbor = mountain[1]` (4)
 *        - `rightNeighbor = mountain[3]` (5)
 *        - Is `3 > 4` AND `3 > 5`? No (false && false).
 *      - `elementIndex = 3`:
 *        - `currentValue = mountain[3]` (5)
 *        - `leftNeighbor = mountain[2]` (3)
 *        - `rightNeighbor = mountain[4]` (1)
 *        - Is `5 > 3` AND `5 > 1`? Yes (true && true).
 *        - `peakIndicesResult.push(3)`. `peakIndicesResult` becomes `[1, 3]`.
 *      - `elementIndex = 4`:
 *        - `currentValue = mountain[4]` (1)
 *        - `leftNeighbor = mountain[3]` (5)
 *        - `rightNeighbor = mountain[5]` (6)
 *        - Is `1 > 5` AND `1 > 6`? No (false && false).
 *   4. Loop finishes.
 *   5. Return `[1, 3]`.
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
var findPeaks = function (mountain) {
  const peakIndicesResult = [];
  const totalElements = mountain.length;

  for (let elementIndex = 1; elementIndex < totalElements - 1; elementIndex++) {
    const currentValue = mountain[elementIndex];
    const leftNeighbor = mountain[elementIndex - 1];
    const rightNeighbor = mountain[elementIndex + 1];

    if (currentValue > leftNeighbor && currentValue > rightNeighbor) {
      peakIndicesResult.push(elementIndex);
    }
  }

  return peakIndicesResult;
};
