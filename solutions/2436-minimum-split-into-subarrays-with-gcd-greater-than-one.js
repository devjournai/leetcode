/**
 * Minimum Split Into Subarrays With Gcd Greater Than One
 * Intuition: A greedy approach works because to minimize splits, we should always extend the current subarray as long as its GCD remains greater than 1. A new split is forced only when including the next element would reduce the current subarray's GCD to 1.
 * Approach: 1. Initialize split count to 1 and the current subarray's GCD with the first element. 2. Iterate through the rest of the array, calculating the GCD of the current subarray's GCD and the current element. 3. If this new GCD is 1, increment the split count and start a new subarray with the current element. 4. Otherwise, update the current subarray's GCD to this new value. 5. Return the final split count.
 * Dry Run: nums = [2, 6, 9, 3]
 *   totalElements = 4
 *   minSplitCount = 1
 *   currentSegmentGcd = 2
 *   elementIndex = 1 (nums[1] = 6):
 *     potentialNextGcd = gcd(2, 6) = 2. Not 1.
 *     currentSegmentGcd = 2.
 *   elementIndex = 2 (nums[2] = 9):
 *     potentialNextGcd = gcd(2, 9) = 1. Is 1.
 *     minSplitCount = 2.
 *     currentSegmentGcd = 9.
 *   elementIndex = 3 (nums[3] = 3):
 *     potentialNextGcd = gcd(9, 3) = 3. Not 1.
 *     currentSegmentGcd = 3.
 *   Loop ends. Return minSplitCount = 2.
 * Time Complexity: O(N * log(max(nums[i])))
 * Space Complexity: O(1)
 */
var minimumSplits = function (nums) {
  const totalElements = nums.length;
  let minSplitCount = 1;
  let currentSegmentGcd = nums[0];

  for (let elementIndex = 1; elementIndex < totalElements; elementIndex++) {
    const potentialNextGcd = calculateGcd(
      currentSegmentGcd,
      nums[elementIndex],
    );
    if (potentialNextGcd === 1) {
      minSplitCount++;
      currentSegmentGcd = nums[elementIndex];
    } else {
      currentSegmentGcd = potentialNextGcd;
    }
  }

  return minSplitCount;

  function calculateGcd(firstNumber, secondNumber) {
    while (secondNumber !== 0) {
      const temporaryDivisor = secondNumber;
      secondNumber = firstNumber % secondNumber;
      firstNumber = temporaryDivisor;
    }
    return firstNumber;
  }
};
