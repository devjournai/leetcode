/**
 * Minimum Operations To Make The Array Alternating
 * Intuition: An alternating array has all even-indexed elements equal to one value (X) and all odd-indexed elements equal to another value (Y), where X must not equal Y. To minimize operations, we should choose X and Y to be the most frequent numbers in their respective groups.
 * Approach:
 * 1. Handle edge cases: If the array has 0 or 1 elements, it's already alternating, so 0 operations are needed.
 * 2. Create two frequency maps: `evenIndexFrequencyMap` for numbers at even indices and `oddIndexFrequencyMap` for numbers at odd indices.
 * 3. Iterate through the input array, populating these frequency maps based on the index parity.
 * 4. Calculate `totalEvenPositions` and `totalOddPositions` to know how many elements are in each group.
 * 5. Convert each frequency map into an array of `[value, count]` pairs. Sort these arrays in descending order based on count. Select up to the top two most frequent elements from each to form `topEvenCandidates` and `topOddCandidates`. This accounts for potential conflicts where the most frequent number in both groups is the same.
 * 6. Initialize `minimumOperationsCount` to the array's total length (worst-case).
 * 7. Iterate through all combinations of the candidates from `topEvenCandidates` and `topOddCandidates`. For each pair `(evenVal, oddVal)`:
 *    a. If `evenVal` is different from `oddVal` (or if `evenVal` is the sentinel `0` representing an empty candidate list), calculate the operations required: `(totalEvenPositions - evenValCount) + (totalOddPositions - oddValCount)`.
 *    b. Update `minimumOperationsCount` with the smallest operations found so far.
 * 8. After checking all candidate pairs, if `minimumOperationsCount` is still equal to the original array length, it implies that no valid `(evenVal, oddVal)` pair was found among the top candidates where `evenVal !== oddVal`. This scenario happens when, for example, the only non-zero candidates are identical (e.g., `[1,1,1,1]` where both even and odd top candidates are `[1,2]`). In such a case, the minimum operations will be to change all elements in the smaller group (or either, if sizes are equal) to a new distinct number. This is `Math.min(totalEvenPositions, totalOddPositions)`. Otherwise, return the `minimumOperationsCount`.
 * Dry Run: nums = [3,1,3,2,4,3]
 *   - inputArrayLength = 6. Condition `inputArrayLength <= 1` is false.
 *   - evenIndexFrequencyMap = {3:2, 4:1}
 *   - oddIndexFrequencyMap = {1:1, 2:1, 3:1}
 *   - totalEvenPositions = 3 (indices 0,2,4)
 *   - totalOddPositions = 3 (indices 1,3,5)
 *   - topEvenCandidates = [[3,2], [4,1]] (sorted by frequency desc)
 *   - topOddCandidates = [[1,1], [2,1]] (example sort order if counts are equal)
 *   - minimumOperationsCount = 6
 *   - Loop iterations:
 *     - evenChoiceVal=3, evenChoiceCount=2 | oddChoiceVal=1, oddChoiceCount=1: 3 != 1. Current operations = (3-2) + (3-1) = 1 + 2 = 3. minimumOperationsCount = min(6, 3) = 3.
 *     - evenChoiceVal=3, evenChoiceCount=2 | oddChoiceVal=2, oddChoiceCount=1: 3 != 2. Current operations = (3-2) + (3-1) = 1 + 2 = 3. minimumOperationsCount = min(3, 3) = 3.
 *     - evenChoiceVal=4, evenChoiceCount=1 | oddChoiceVal=1, oddChoiceCount=1: 4 != 1. Current operations = (3-1) + (3-1) = 2 + 2 = 4. minimumOperationsCount = min(3, 4) = 3.
 *     - evenChoiceVal=4, evenChoiceCount=1 | oddChoiceVal=2, oddChoiceCount=1: 4 != 2. Current operations = (3-1) + (3-1) = 2 + 2 = 4. minimumOperationsCount = min(3, 4) = 3.
 *   - Loop finishes. minimumOperationsCount is 3.
 *   - Final return condition (3 === 6) is false. Return 3.
 * Time Complexity: O(N + D log D)
 * Space Complexity: O(D)
 */
var minimumOperations = function (nums) {
  const inputArrayLength = nums.length;

  if (inputArrayLength <= 1) {
    return 0;
  }

  const evenIndexFrequencyMap = new Map();
  const oddIndexFrequencyMap = new Map();

  for (
    let currentNumberIndex = 0;
    currentNumberIndex < inputArrayLength;
    currentNumberIndex++
  ) {
    const currentElementValue = nums[currentNumberIndex];
    if (currentNumberIndex % 2 === 0) {
      evenIndexFrequencyMap.set(
        currentElementValue,
        (evenIndexFrequencyMap.get(currentElementValue) || 0) + 1,
      );
    } else {
      oddIndexFrequencyMap.set(
        currentElementValue,
        (oddIndexFrequencyMap.get(currentElementValue) || 0) + 1,
      );
    }
  }

  const topEvenCandidates = [...evenIndexFrequencyMap.entries()]
    .sort((elementA, elementB) => elementB[1] - elementA[1])
    .slice(0, 2);

  const topOddCandidates = [...oddIndexFrequencyMap.entries()]
    .sort((elementC, elementD) => elementD[1] - elementC[1])
    .slice(0, 2);

  const totalEvenPositions = Math.ceil(inputArrayLength / 2);
  const totalOddPositions = Math.floor(inputArrayLength / 2);

  let minimumOperationsCount = inputArrayLength;

  const defaultEmptyCandidate = [[0, 0]];

  for (const [evenChoiceVal, evenChoiceCount] of topEvenCandidates.length > 0
    ? topEvenCandidates
    : defaultEmptyCandidate) {
    for (const [oddChoiceVal, oddChoiceCount] of topOddCandidates.length > 0
      ? topOddCandidates
      : defaultEmptyCandidate) {
      if (evenChoiceVal !== oddChoiceVal || evenChoiceVal === 0) {
        const currentOperations =
          totalEvenPositions -
          evenChoiceCount +
          (totalOddPositions - oddChoiceCount);
        minimumOperationsCount = Math.min(
          minimumOperationsCount,
          currentOperations,
        );
      }
    }
  }

  if (minimumOperationsCount === inputArrayLength) {
    return Math.min(totalEvenPositions, totalOddPositions);
  }

  return minimumOperationsCount;
};
