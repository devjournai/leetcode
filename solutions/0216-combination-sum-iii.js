/**
 * Combination Sum III
 * Intuition: We need k distinct digits from 1..9 that sum to n. Backtracking with a rising start index enforces uniqueness and order.
 * Approach: 1. DFS with path, running sum, and nextStart. 2. Abort if sum > n; if path length is k, keep the path when sum === n. 3. Try candidates from nextStart through 9, appending and recursing with start = candidate+1. 4. Return the collected lists.
 * Dry Run: k = 3, n = 7.
 *   - Path [1,2] sum 3; try 3 → 6 ≠ 7; try 4 → [1,2,4] sum 7 → keep.
 *   - Other k-length paths miss 7. Return [[1,2,4]].
 * Time Complexity: O(C(9, k) * k)
 * Space Complexity: O(k)
 */
var combinationSum3 = function (k, n) {
  const finalCombinations = [];

  function findCombinations(currentPath, currentSumValue, nextStartNumber) {
    if (currentSumValue > n) {
      return;
    }

    if (currentPath.length === k) {
      if (currentSumValue === n) {
        finalCombinations.push(currentPath);
      }
      return;
    }

    for (
      let numberCandidate = nextStartNumber;
      numberCandidate <= 9;
      numberCandidate++
    ) {
      findCombinations(
        [...currentPath, numberCandidate],
        currentSumValue + numberCandidate,
        numberCandidate + 1
      );
    }
  }

  findCombinations([], 0, 1);

  return finalCombinations;
};
