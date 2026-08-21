/**
 * Maximum Gcd Sum Of A Subarray
 * Intuition: The greatest common divisor (GCD) of a sequence of numbers is non-increasing as more numbers are added. This property allows for an optimization: for any fixed ending position `i`, the distinct GCD values of all subarrays `nums[j...i]` (where `j <= i`) are limited to `log(max_val)` distinct values. We can maintain a list of `[start_index, current_gcd]` pairs for distinct GCDs ending at `i`, efficiently updating it in O(log(max_val)) time per element.
 * Approach: 1. Precompute prefix sums to quickly find subarray sums. 2. Initialize `maximumGcdSumValue` to 0. 3. Iterate through the input array `nums` with an outer loop for the ending index `currentIndex`. 4. Inside the loop, maintain a list `gcdValuePairs` where each entry `[startPosition, currentAggregateGcd]` represents a subarray `nums[startPosition...currentIndex]` that has `currentAggregateGcd` as its GCD, and `currentAggregateGcd` is distinct from adjacent entries in the list. This list is kept sorted by `currentAggregateGcd` (implicitly, as new GCDs are formed by extending from previous ones, they will be equal or smaller). 5. To update `gcdValuePairs` for `currentIndex`: create `potentialGcdUpdates`. Iterate through the existing `gcdValuePairs` and append a new candidate `[currentIndex, nums[currentIndex]]`. For each `[startPosition, currentAggregateGcd]` in this combined list, calculate `calculatedGcdForSegment = calculateGcd(currentAggregateGcd, nums[currentIndex])`. Add `[startPosition, calculatedGcdForSegment]` to `potentialGcdUpdates` only if `calculatedGcdForSegment` is different from the last GCD added to `potentialGcdUpdates`, effectively merging identical GCD segments. 6. Replace `gcdValuePairs` with `potentialGcdUpdates`. 7. After updating `gcdValuePairs`, iterate through it. For each `[segmentStartingIndex, segmentGcdValue]`, check if the subarray length `currentIndex - segmentStartingIndex + 1` is at least `k`. If it is, calculate the `currentSubarraySum` using `prefixSumsArray`. Update `maximumGcdSumValue` with `Math.max(maximumGcdSumValue, currentSubarraySum * segmentGcdValue)`. 8. Return `maximumGcdSumValue`.
 * Dry Run: nums = [6, 3, 5, 4], k = 2
 * initial: prefixSumsArray = [0], gcdValuePairs = [], maximumGcdSumValue = 0
 *
 * currentIndex = 0 (nums[0] = 6)
 *   prefixSumsArray = [0, 6]
 *   candidateInfoCollection = [[0, 6]]
 *   Processing candidates:
 *     [0, 6] -> calculatedGcdForSegment = gcd(6, 6) = 6. potentialGcdUpdates = [[0, 6]]
 *   gcdValuePairs = [[0, 6]]
 *   (length 1 < k) -> continue
 *
 * currentIndex = 1 (nums[1] = 3)
 *   prefixSumsArray = [0, 6, 9]
 *   candidateInfoCollection = [[0, 6], [1, 3]]
 *   Processing candidates:
 *     [0, 6] -> calculatedGcdForSegment = gcd(6, 3) = 3. potentialGcdUpdates = [[0, 3]]
 *     [1, 3] -> calculatedGcdForSegment = gcd(3, 3) = 3. (same as last GCD in potentialGcdUpdates, so skip adding duplicate GCD)
 *   gcdValuePairs = [[0, 3]]
 *   Iterating gcdValuePairs:
 *     [segmentStartingIndex = 0, segmentGcdValue = 3]
 *     length = 1 - 0 + 1 = 2. (2 >= k).
 *     currentSubarraySum = prefixSumsArray[2] - prefixSumsArray[0] = 9 - 0 = 9.
 *     maximumGcdSumValue = max(0, 9 * 3) = 27.
 *
 * currentIndex = 2 (nums[2] = 5)
 *   prefixSumsArray = [0, 6, 9, 14]
 *   candidateInfoCollection = [[0, 3], [2, 5]]
 *   Processing candidates:
 *     [0, 3] -> calculatedGcdForSegment = gcd(3, 5) = 1. potentialGcdUpdates = [[0, 1]]
 *     [2, 5] -> calculatedGcdForSegment = gcd(5, 5) = 5. (differs from 1) potentialGcdUpdates = [[0, 1], [2, 5]]
 *   gcdValuePairs = [[0, 1], [2, 5]]
 *   Iterating gcdValuePairs:
 *     [segmentStartingIndex = 0, segmentGcdValue = 1]
 *     length = 2 - 0 + 1 = 3. (3 >= k).
 *     currentSubarraySum = prefixSumsArray[3] - prefixSumsArray[0] = 14 - 0 = 14.
 *     maximumGcdSumValue = max(27, 14 * 1) = 27.
 *     [segmentStartingIndex = 2, segmentGcdValue = 5]
 *     length = 2 - 2 + 1 = 1. (1 < k) -> break (because gcdValuePairs are ordered by start index, so subsequent ones will also be too short or shorter)
 *
 * currentIndex = 3 (nums[3] = 4)
 *   prefixSumsArray = [0, 6, 9, 14, 18]
 *   candidateInfoCollection = [[0, 1], [2, 5], [3, 4]]
 *   Processing candidates:
 *     [0, 1] -> calculatedGcdForSegment = gcd(1, 4) = 1. potentialGcdUpdates = [[0, 1]]
 *     [2, 5] -> calculatedGcdForSegment = gcd(5, 4) = 1. (same as last GCD in potentialGcdUpdates, so skip)
 *     [3, 4] -> calculatedGcdForSegment = gcd(4, 4) = 4. (differs from 1) potentialGcdUpdates = [[0, 1], [3, 4]]
 *   gcdValuePairs = [[0, 1], [3, 4]]
 *   Iterating gcdValuePairs:
 *     [segmentStartingIndex = 0, segmentGcdValue = 1]
 *     length = 3 - 0 + 1 = 4. (4 >= k).
 *     currentSubarraySum = prefixSumsArray[4] - prefixSumsArray[0] = 18 - 0 = 18.
 *     maximumGcdSumValue = max(27, 18 * 1) = 27.
 *     [segmentStartingIndex = 3, segmentGcdValue = 4]
 *     length = 3 - 3 + 1 = 1. (1 < k) -> break
 *
 * Final result: 27
 *
 * Time Complexity: O(N * (log(Max_A))^2)
 * Space Complexity: O(N)
 */
var maxGcdSum = function (nums, k) {
  const prefixSumsArray = [0];
  let gcdValuePairs = [];
  let maximumGcdSumValue = 0;

  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    prefixSumsArray.push(
      prefixSumsArray[prefixSumsArray.length - 1] + nums[currentIndex]
    );

    const potentialGcdUpdates = [];
    const candidateInfoCollection = [
      ...gcdValuePairs,
      [currentIndex, nums[currentIndex]],
    ];

    for (const [
      startPosition,
      currentAggregateGcd,
    ] of candidateInfoCollection) {
      const calculatedGcdForSegment = calculateGcd(
        currentAggregateGcd,
        nums[currentIndex]
      );
      if (
        potentialGcdUpdates.length === 0 ||
        potentialGcdUpdates[potentialGcdUpdates.length - 1][1] !==
          calculatedGcdForSegment
      ) {
        potentialGcdUpdates.push([startPosition, calculatedGcdForSegment]);
      }
    }

    gcdValuePairs = potentialGcdUpdates;

    for (const [segmentStartingIndex, segmentGcdValue] of gcdValuePairs) {
      if (currentIndex - segmentStartingIndex + 1 < k) {
        break;
      }
      const currentSubarraySum =
        prefixSumsArray[prefixSumsArray.length - 1] -
        prefixSumsArray[segmentStartingIndex];
      maximumGcdSumValue = Math.max(
        maximumGcdSumValue,
        currentSubarraySum * segmentGcdValue
      );
    }
  }

  return maximumGcdSumValue;

  function calculateGcd(firstNumber, secondNumber) {
    while (secondNumber !== 0) {
      const temporaryValue = secondNumber;
      secondNumber = firstNumber % secondNumber;
      firstNumber = temporaryValue;
    }
    return firstNumber;
  }
};
