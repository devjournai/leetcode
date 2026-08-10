/**
 * Length Of Longest Subarray With At Most K Frequency
 * Intuition: The problem asks for the maximum length of a subarray satisfying a condition. This often suggests a sliding window or binary search on the answer.
 * Approach: 1. Utilize binary search on the possible subarray lengths. The `checkValidity` function determines if a subarray of a given length can be "good". 2. The `checkValidity` function employs a fixed-size sliding window. It initializes a window of the target length, tracks element frequencies, and counts how many elements exceed the `k` frequency limit. 3. As the window slides, elements are removed from the left and added to the right, updating frequencies and the violation count. If at any point the violation count is zero, a valid subarray of that length exists, and `true` is returned. 4. The binary search iteratively narrows down the range of possible lengths, aiming for the largest valid length.
 * Dry Run: nums = [1,2,1,2,1,2,1], k = 2
 *   - `maxSubarrayLength([1,2,1,2,1,2,1], 2)`
 *   - `minimumLengthPossible = 1`, `maximumLengthPossible = 7`, `finalLongestLength = 0`
 *   - **Iteration 1: `midpointLength = 4`**
 *     - `checkValidity(4, [1,2,1,2,1,2,1], 2)`:
 *       - Initial window `[1,2,1,2]`: `elementsFrequencyMap = {1:2, 2:2}`, `violationCounter = 0`. Returns `true`.
 *     - `finalLongestLength = 4`, `minimumLengthPossible = 5`.
 *   - **Iteration 2: `midpointLength = 6`**
 *     - `checkValidity(6, [1,2,1,2,1,2,1], 2)`:
 *       - Initial window `[1,2,1,2,1,2]`: `elementsFrequencyMap` for `[1,2,1,2,1,2]` implies `1` occurs 3 times and `2` occurs 3 times.
 *       - `violationCounter` becomes 1 when `1` reaches count 3 (exceeds k=2). `violationCounter` becomes 2 when `2` reaches count 3.
 *       - `violationCounter = 2`. Not good.
 *       - Slide window: (from `[1,2,1,2,1,2]` to `[2,1,2,1,2,1]`)
 *         - Remove `1` (from `nums[0]`), add `1` (from `nums[6]`).
 *         - Removing `1` (count was 3, now 2) decrements `violationCounter` to 1.
 *         - Adding `1` (count was 2, now 3) increments `violationCounter` to 2.
 *         - `elementsFrequencyMap = {1:3, 2:3}`, `violationCounter = 2`. Still not good.
 *       - Returns `false`.
 *     - `maximumLengthPossible = 5`.
 *   - **Iteration 3: `midpointLength = 5`**
 *     - `checkValidity(5, [1,2,1,2,1,2,1], 2)`:
 *       - Initial window `[1,2,1,2,1]`: `elementsFrequencyMap = {1:3, 2:2}`. `violationCounter = 1` (for `1`). Not good.
 *       - Slide window:
 *         - `windowIndex = 5` (window: `[2,1,2,1,2]`): Remove `1` (from `nums[0]`), add `2` (from `nums[5]`).
 *           - Removing `1` (count 3->2) decrements `violationCounter` to 0.
 *           - Adding `2` (count 2->3) increments `violationCounter` to 1.
 *           - `elementsFrequencyMap = {1:2, 2:3}`, `violationCounter = 1`. Still not good.
 *         - `windowIndex = 6` (window: `[1,2,1,2,1]`): Remove `2` (from `nums[1]`), add `1` (from `nums[6]`).
 *           - Removing `2` (count 3->2) decrements `violationCounter` to 0.
 *           - Adding `1` (count 2->3) increments `violationCounter` to 1.
 *           - `elementsFrequencyMap = {1:3, 2:2}`, `violationCounter = 1`. Still not good.
 *       - Returns `false`.
 *     - `maximumLengthPossible = 4`.
 *   - Loop terminates (`minimumLengthPossible = 5` > `maximumLengthPossible = 4`).
 *   - Returns `finalLongestLength = 4`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(U)
 */
var maxSubarrayLength = function (numsArray, maxFrequencyLimit) {
  function checkValidity(
    currentCandidateLength,
    sourceArray,
    allowedFrequency,
  ) {
    if (currentCandidateLength === 0) {
      return true;
    }
    if (currentCandidateLength > sourceArray.length) {
      return false;
    }

    const elementsFrequencyMap = new Map();
    let violationCounter = 0;

    for (
      let currentInitialIndex = 0;
      currentInitialIndex < currentCandidateLength;
      currentInitialIndex++
    ) {
      const valueAtCurrentInitial = sourceArray[currentInitialIndex];
      const previousOccurrence =
        elementsFrequencyMap.get(valueAtCurrentInitial) || 0;
      elementsFrequencyMap.set(valueAtCurrentInitial, previousOccurrence + 1);
      if (previousOccurrence + 1 === allowedFrequency + 1) {
        violationCounter++;
      }
    }

    if (violationCounter === 0) {
      return true;
    }

    for (
      let slideIterationIndex = currentCandidateLength;
      slideIterationIndex < sourceArray.length;
      slideIterationIndex++
    ) {
      const valueToEvict =
        sourceArray[slideIterationIndex - currentCandidateLength];
      const valueToInclude = sourceArray[slideIterationIndex];

      const countBeforeEviction = elementsFrequencyMap.get(valueToEvict);
      if (countBeforeEviction === allowedFrequency + 1) {
        violationCounter--;
      }
      elementsFrequencyMap.set(valueToEvict, countBeforeEviction - 1);

      const countBeforeInclusion =
        elementsFrequencyMap.get(valueToInclude) || 0;
      elementsFrequencyMap.set(valueToInclude, countBeforeInclusion + 1);
      if (countBeforeInclusion + 1 === allowedFrequency + 1) {
        violationCounter++;
      }

      if (violationCounter === 0) {
        return true;
      }
    }

    return false;
  }

  let minimumLengthPossible = 0;
  let maximumLengthPossible = numsArray.length;
  let finalLongestLength = 0;

  while (minimumLengthPossible <= maximumLengthPossible) {
    const midpointLength = Math.floor(
      (minimumLengthPossible + maximumLengthPossible) / 2,
    );

    if (midpointLength === 0) {
      // Edge case: length 0 is technically valid, but problem asks for non-empty. Maximize length, so 0 won't be the answer unless nums is empty.
      minimumLengthPossible = 1;
      continue;
    }

    if (checkValidity(midpointLength, numsArray, maxFrequencyLimit)) {
      finalLongestLength = midpointLength;
      minimumLengthPossible = midpointLength + 1;
    } else {
      maximumLengthPossible = midpointLength - 1;
    }
  }

  return finalLongestLength;
};
