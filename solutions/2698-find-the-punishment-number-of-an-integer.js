/**
 * Find The Punishment Number Of An Integer
 * Intuition: The core challenge is to determine if the square of an integer 'i' can be partitioned into contiguous substrings that sum up to 'i'. This is a classic partitioning problem that can be solved efficiently using a recursive backtracking approach.
 * Approach:
 * 1. Initialize a variable `totalPunishmentValue` to 0. This will store the sum of squares of qualifying integers.
 * 2. Define a helper function, say `checkPartitionValidity`, that takes three arguments: the string representation of `i*i`, the target sum `i`, and the current starting index for partitioning.
 * 3. `checkPartitionValidity` operates as follows:
 *    a. Base Case 1: If the `currentStartingIndex` has reached the end of the string, return `true` if the `targetSum` is 0, otherwise return `false`.
 *    b. Base Case 2: If `targetSum` becomes negative at any point, it means we've overshot the target, so return `false`.
 *    c. Recursive Step: Iterate `parsePointer` from `currentStartingIndex` to the end of the string.
 *       i. Accumulate digits from `currentStartingIndex` to `parsePointer` to form a `currentSegmentNumber`.
 *       ii. If `currentSegmentNumber` exceeds `targetSum`, break the loop as further segments from this point will also exceed the target (numbers are positive).
 *       iii. Recursively call `checkPartitionValidity` with the remaining `targetSum - currentSegmentNumber` and the next `parsePointer + 1`. If this recursive call returns `true`, it means a valid partition was found, so propagate `true` upwards.
 *    d. If the loop completes without finding any valid partition, return `false`.
 * 4. Iterate `currentValue` from 1 to `n`.
 * 5. For each `currentValue`, calculate its square (`squaredValue = currentValue * currentValue`).
 * 6. Convert `squaredValue` to a string (`squareAsString = squaredValue.toString()`).
 * 7. Call `checkPartitionValidity(squareAsString, currentValue, 0)`.
 * 8. If `checkPartitionValidity` returns `true`, add `squaredValue` to `totalPunishmentValue`.
 * 9. After the loop finishes, return `totalPunishmentValue`.
 * Dry Run: n = 10
 * totalPunishmentValue = 0
 *
 * currentValue = 1:
 *   squaredValue = 1. squareAsString = "1".
 *   checkPartitionValidity("1", 1, 0):
 *     - parsePointer = 0: currentSegmentNumber = 1.
 *       - checkPartitionValidity("1", 1 - 1, 0 + 1) -> checkPartitionValidity("1", 0, 1):
 *         - currentStartingIndex (1) === string.length (1). targetSum (0) === 0. Returns true.
 *     Returns true.
 *   totalPunishmentValue += 1 (total: 1).
 *
 * ... (skip some values that won't satisfy, e.g., 2, 3, 4, etc.)
 *
 * currentValue = 9:
 *   squaredValue = 81. squareAsString = "81".
 *   checkPartitionValidity("81", 9, 0):
 *     - parsePointer = 0: currentSegmentNumber = 8.
 *       - checkPartitionValidity("81", 9 - 8, 0 + 1) -> checkPartitionValidity("81", 1, 1):
 *         - parsePointer = 1: currentSegmentNumber = 1 (from '1' at index 1).
 *           - checkPartitionValidity("81", 1 - 1, 1 + 1) -> checkPartitionValidity("81", 0, 2):
 *             - currentStartingIndex (2) === string.length (2). targetSum (0) === 0. Returns true.
 *         Returns true.
 *     Returns true.
 *   totalPunishmentValue += 81 (total: 1 + 81 = 82).
 *
 * currentValue = 10:
 *   squaredValue = 100. squareAsString = "100".
 *   checkPartitionValidity("100", 10, 0):
 *     - parsePointer = 0: currentSegmentNumber = 1.
 *       - checkPartitionValidity("100", 10 - 1, 1) -> checkPartitionValidity("100", 9, 1): ... (this path will eventually return false)
 *     - parsePointer = 1: currentSegmentNumber becomes 10 (from "10").
 *       - checkPartitionValidity("100", 10 - 10, 1 + 1) -> checkPartitionValidity("100", 0, 2):
 *         - parsePointer = 2: currentSegmentNumber = 0 (from '0' at index 2).
 *           - checkPartitionValidity("100", 0 - 0, 2 + 1) -> checkPartitionValidity("100", 0, 3):
 *             - currentStartingIndex (3) === string.length (3). targetSum (0) === 0. Returns true.
 *         Returns true.
 *     Returns true.
 *   totalPunishmentValue += 100 (total: 82 + 100 = 182).
 *
 * Returns 182.
 * Time Complexity: O(n * 2^(2 * log10(n)))
 * Space Complexity: O(log n)
 */
var punishmentNumber = function (n) {
  function checkPartitionValidity(
    inputStringValue,
    desiredSumValue,
    currentStartIndex,
  ) {
    if (currentStartIndex === inputStringValue.length) {
      return desiredSumValue === 0;
    }

    if (desiredSumValue < 0) {
      return false;
    }

    let segmentAccumulator = 0;
    for (
      let currentParseIndex = currentStartIndex;
      currentParseIndex < inputStringValue.length;
      currentParseIndex++
    ) {
      segmentAccumulator =
        segmentAccumulator * 10 +
        parseInt(inputStringValue[currentParseIndex], 10);

      if (segmentAccumulator > desiredSumValue) {
        break;
      }

      if (
        checkPartitionValidity(
          inputStringValue,
          desiredSumValue - segmentAccumulator,
          currentParseIndex + 1,
        )
      ) {
        return true;
      }
    }

    return false;
  }

  let totalPunishmentValue = 0;
  for (let currentNumber = 1; currentNumber <= n; currentNumber++) {
    const squaredNumber = currentNumber * currentNumber;
    const squaredStringRepresentation = squaredNumber.toString();

    if (checkPartitionValidity(squaredStringRepresentation, currentNumber, 0)) {
      totalPunishmentValue += squaredNumber;
    }
  }

  return totalPunishmentValue;
};
