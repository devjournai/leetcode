/**
 * Find The Score Of All Prefixes Of An Array
 * Intuition: The problem asks for a running sum of "conversion values", where each conversion value depends on the current number and the maximum value encountered so far in the prefix. This implies a single pass through the array, maintaining the maximum value seen and a cumulative sum of conversion values.
 * Approach: 1. Initialize an empty array `prefixScores` to store the results, a variable `currentMaximum` to track the maximum element up to the current index, and `runningScoreSum` to accumulate the conversion values. 2. Iterate through the input array `inputNumbers` using a `while` loop. 3. In each iteration, update `currentMaximum` by comparing it with the current number. 4. Calculate the `conversionValue` for the current element: `inputNumbers[elementIndex] + currentMaximum`. 5. Add this `conversionValue` to `runningScoreSum`. 6. Store `runningScoreSum` into `prefixScores[elementIndex]`. 7. Increment the loop index. 8. Return `prefixScores`.
 * Dry Run: inputNumbers = [2, 3, 7, 5, 10]
 *   - Initialize prefixScores = [_,_,_,_,_], currentMaximum = 0, runningScoreSum = 0, elementIndex = 0
 *   - elementIndex = 0 (value = 2):
 *     - currentMaximum = max(0, 2) = 2
 *     - conversionValue = 2 + 2 = 4
 *     - runningScoreSum = 0 + 4 = 4
 *     - prefixScores[0] = 4
 *   - elementIndex = 1 (value = 3):
 *     - currentMaximum = max(2, 3) = 3
 *     - conversionValue = 3 + 3 = 6
 *     - runningScoreSum = 4 + 6 = 10
 *     - prefixScores[1] = 10
 *   - elementIndex = 2 (value = 7):
 *     - currentMaximum = max(3, 7) = 7
 *     - conversionValue = 7 + 7 = 14
 *     - runningScoreSum = 10 + 14 = 24
 *     - prefixScores[2] = 24
 *   - elementIndex = 3 (value = 5):
 *     - currentMaximum = max(7, 5) = 7
 *     - conversionValue = 5 + 7 = 12
 *     - runningScoreSum = 24 + 12 = 36
 *     - prefixScores[3] = 36
 *   - elementIndex = 4 (value = 10):
 *     - currentMaximum = max(7, 10) = 10
 *     - conversionValue = 10 + 10 = 20
 *     - runningScoreSum = 36 + 20 = 56
 *     - prefixScores[4] = 56
 *   - Loop ends. Return prefixScores = [4, 10, 24, 36, 56].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findPrefixScore = function (inputNumbers) {
  const prefixScores = new Array(inputNumbers.length);
  let currentMaximum = 0;
  let runningScoreSum = 0;
  let elementIndex = 0;

  while (elementIndex < inputNumbers.length) {
    currentMaximum = Math.max(currentMaximum, inputNumbers[elementIndex]);
    const conversionValue = inputNumbers[elementIndex] + currentMaximum;
    runningScoreSum += conversionValue;
    prefixScores[elementIndex] = runningScoreSum;
    elementIndex++;
  }

  return prefixScores;
};
