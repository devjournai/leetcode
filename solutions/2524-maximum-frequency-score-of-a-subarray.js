/**
 * Maximum Frequency Score Of A Subarray
 * Intuition: A sliding window approach efficiently finds the maximum frequency score for subarrays of a fixed size. The challenge lies in dynamically updating the score as elements enter and leave the window, which requires maintaining the `value^frequency` for each distinct number using modular arithmetic.
 * Approach:
 * 1. Initialize a constant `calculationModulus` to `1e9 + 7`.
 * 2. Declare `currentWindowSumScore` to track the score of the current window and `overallMaximumScore` to store the highest score found. Both start at 0.
 * 3. Utilize a `Map` named `elementPowerSequences` where keys are numbers from `nums` and values are arrays. Each array `[x^1, x^2, ..., x^f]` stores powers of `x` up to its current frequency `f` within the window. The last element of this array `x^f` is its current score contribution.
 * 4. Iterate through the `nums` array using `rightWindowIndex` as the right pointer of the sliding window:
 *    a. Get `currentValue` at `nums[rightWindowIndex]`.
 *    b. If `currentValue` is not present in `elementPowerSequences`, initialize an empty array for it.
 *    c. Retrieve `currentValueSequence` which is the power array for `currentValue`.
 *    d. Store `previousContribution` as 0 initially. If `currentValueSequence` is not empty, set `previousContribution` to its last element.
 *    e. Subtract `previousContribution` from `currentWindowSumScore` to remove its old contribution: `currentWindowSumScore = (currentWindowSumScore - previousContribution + calculationModulus) % calculationModulus`.
 *    f. Calculate `nextPowerTerm`: If `currentValueSequence` was empty, `nextPowerTerm` is `currentValue`. Otherwise, it's `(currentValue * currentValueSequence[currentValueSequence.length - 1]) % calculationModulus`. This computes `currentValue^(f+1)`.
 *    g. Add `nextPowerTerm` to `currentValueSequence`.
 *    h. Add `nextPowerTerm` to `currentWindowSumScore` as its new contribution: `currentWindowSumScore = (currentWindowSumScore + nextPowerTerm) % calculationModulus`.
 *    i. Once `rightWindowIndex` reaches `k - 1` or greater, the window is of valid size:
 *       i. Update `overallMaximumScore` by taking the maximum between `overallMaximumScore` and `currentWindowSumScore`.
 *       ii. Identify `valueToEvict` from the left of the window, which is `nums[rightWindowIndex - k + 1]`.
 *       iii. Retrieve `evictedValueSequence` for `valueToEvict`.
 *       iv. Store `oldEvictedContribution` which is the last element of `evictedValueSequence`.
 *       v. Subtract `oldEvictedContribution` from `currentWindowSumScore`: `currentWindowSumScore = (currentWindowSumScore - oldEvictedContribution + calculationModulus) % calculationModulus`.
 *       vi. Remove the last power from `evictedValueSequence` (effectively decreasing its frequency by one).
 *       vii. If `evictedValueSequence` is still not empty (meaning `valueToEvict` still exists in the window with `f' > 0`), add its new highest power (`evictedValueSequence[evictedValueSequence.length - 1]`) back to `currentWindowSumScore`: `currentWindowSumScore = (currentWindowSumScore + evictedValueSequence[evictedValueSequence.length - 1]) % calculationModulus`.
 * 5. Return `overallMaximumScore`.
 * Dry Run: nums = [5,4,5,7,4,4], k = 3, MOD = 1e9 + 7
 * Initial: currentWindowSumScore = 0, overallMaximumScore = 0, elementPowerSequences = {}
 *
 * rightWindowIndex = 0, currentValue = 5:
 *   elementPowerSequences.set(5, []) -> { 5: [] }
 *   currentValueSequence = []
 *   previousContribution = 0
 *   currentWindowSumScore = (0 - 0 + MOD) % MOD = 0
 *   nextPowerTerm = (5 * 1) % MOD = 5
 *   currentValueSequence.push(5) -> elementPowerSequences = { 5: [5] }
 *   currentWindowSumScore = (0 + 5) % MOD = 5
 *   Window not yet size k (0 < 2).
 *
 * rightWindowIndex = 1, currentValue = 4:
 *   elementPowerSequences.set(4, []) -> { 5: [5], 4: [] }
 *   currentValueSequence = []
 *   previousContribution = 0
 *   currentWindowSumScore = (5 - 0 + MOD) % MOD = 5
 *   nextPowerTerm = (4 * 1) % MOD = 4
 *   currentValueSequence.push(4) -> elementPowerSequences = { 5: [5], 4: [4] }
 *   currentWindowSumScore = (5 + 4) % MOD = 9
 *   Window not yet size k (1 < 2).
 *
 * rightWindowIndex = 2, currentValue = 5:
 *   currentValueSequence (for 5) = [5]. previousContribution = 5.
 *   currentWindowSumScore = (9 - 5 + MOD) % MOD = 4 (removing old 5^1)
 *   nextPowerTerm = (5 * 5) % MOD = 25
 *   currentValueSequence.push(25) -> elementPowerSequences = { 5: [5, 25], 4: [4] }
 *   currentWindowSumScore = (4 + 25) % MOD = 29 (adding new 5^2)
 *   Window size k=3 achieved (rightWindowIndex = 2 >= k-1 = 2). Current window is [5,4,5].
 *   overallMaximumScore = Math.max(0, 29) = 29.
 *   valueToEvict = nums[2 - 3 + 1] = nums[0] = 5.
 *   evictedValueSequence (for 5) = [5, 25]. oldEvictedContribution = 25.
 *   currentWindowSumScore = (29 - 25 + MOD) % MOD = 4 (removing 5^2 contribution)
 *   evictedValueSequence.pop() -> [5] (for 5)
 *   evictedValueSequence is not empty. Add new highest power (5) back:
 *   currentWindowSumScore = (4 + 5) % MOD = 9 (adding 5^1 contribution)
 *   (Current score 9 for remaining [4,5])
 *
 * rightWindowIndex = 3, currentValue = 7:
 *   elementPowerSequences.set(7, []) -> { 5: [5], 4: [4], 7: [] }
 *   currentValueSequence = []
 *   previousContribution = 0
 *   currentWindowSumScore = (9 - 0 + MOD) % MOD = 9
 *   nextPowerTerm = (7 * 1) % MOD = 7
 *   currentValueSequence.push(7) -> elementPowerSequences = { 5: [5], 4: [4], 7: [7] }
 *   currentWindowSumScore = (9 + 7) % MOD = 16
 *   Window size k=3 achieved (rightWindowIndex = 3 >= k-1 = 2). Current window is [4,5,7].
 *   overallMaximumScore = Math.max(29, 16) = 29.
 *   valueToEvict = nums[3 - 3 + 1] = nums[1] = 4.
 *   evictedValueSequence (for 4) = [4]. oldEvictedContribution = 4.
 *   currentWindowSumScore = (16 - 4 + MOD) % MOD = 12 (removing 4^1 contribution)
 *   evictedValueSequence.pop() -> [] (for 4)
 *   evictedValueSequence is empty, no new contribution.
 *   (Current score 12 for remaining [5,7])
 *
 * rightWindowIndex = 4, currentValue = 4:
 *   elementPowerSequences has 4 as []. So elementPowerSequences = { 5: [5], 4: [], 7: [7] } before set
 *   currentValueSequence = []
 *   previousContribution = 0
 *   currentWindowSumScore = (12 - 0 + MOD) % MOD = 12
 *   nextPowerTerm = (4 * 1) % MOD = 4
 *   currentValueSequence.push(4) -> elementPowerSequences = { 5: [5], 4: [4], 7: [7] }
 *   currentWindowSumScore = (12 + 4) % MOD = 16
 *   Window size k=3 achieved (rightWindowIndex = 4 >= k-1 = 2). Current window is [5,7,4].
 *   overallMaximumScore = Math.max(29, 16) = 29.
 *   valueToEvict = nums[4 - 3 + 1] = nums[2] = 5.
 *   evictedValueSequence (for 5) = [5]. oldEvictedContribution = 5.
 *   currentWindowSumScore = (16 - 5 + MOD) % MOD = 11 (removing 5^1 contribution)
 *   evictedValueSequence.pop() -> [] (for 5)
 *   evictedValueSequence is empty, no new contribution.
 *   (Current score 11 for remaining [7,4])
 *
 * rightWindowIndex = 5, currentValue = 4:
 *   currentValueSequence (for 4) = [4]. previousContribution = 4.
 *   currentWindowSumScore = (11 - 4 + MOD) % MOD = 7 (removing old 4^1)
 *   nextPowerTerm = (4 * 4) % MOD = 16
 *   currentValueSequence.push(16) -> elementPowerSequences = { 5: [], 4: [4, 16], 7: [7] }
 *   currentWindowSumScore = (7 + 16) % MOD = 23 (adding new 4^2)
 *   Window size k=3 achieved (rightWindowIndex = 5 >= k-1 = 2). Current window is [7,4,4].
 *   overallMaximumScore = Math.max(29, 23) = 29.
 *   valueToEvict = nums[5 - 3 + 1] = nums[3] = 7.
 *   evictedValueSequence (for 7) = [7]. oldEvictedContribution = 7.
 *   currentWindowSumScore = (23 - 7 + MOD) % MOD = 16 (removing 7^1 contribution)
 *   evictedValueSequence.pop() -> [] (for 7)
 *   evictedValueSequence is empty, no new contribution.
 *   (Current score 16 for remaining [4,4])
 *
 * Final overallMaximumScore = 29.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var maxFrequencyScore = function (nums, k) {
  const calculationModulus = 1e9 + 7;

  let currentWindowSumScore = 0;
  let overallMaximumScore = 0;
  const elementPowerSequences = new Map();

  for (
    let rightWindowIndex = 0;
    rightWindowIndex < nums.length;
    rightWindowIndex++
  ) {
    const currentValue = nums[rightWindowIndex];

    if (!elementPowerSequences.has(currentValue)) {
      elementPowerSequences.set(currentValue, []);
    }
    const currentValueSequence = elementPowerSequences.get(currentValue);

    let previousContribution = 0;
    if (currentValueSequence.length > 0) {
      previousContribution =
        currentValueSequence[currentValueSequence.length - 1];
    }
    currentWindowSumScore =
      (currentWindowSumScore - previousContribution + calculationModulus) %
      calculationModulus;

    const nextPowerTerm =
      (currentValue *
        (currentValueSequence.length === 0
          ? 1
          : currentValueSequence[currentValueSequence.length - 1])) %
      calculationModulus;
    currentValueSequence.push(nextPowerTerm);
    currentWindowSumScore =
      (currentWindowSumScore + nextPowerTerm) % calculationModulus;

    if (rightWindowIndex >= k - 1) {
      overallMaximumScore = Math.max(
        overallMaximumScore,
        currentWindowSumScore
      );

      const valueToEvict = nums[rightWindowIndex - k + 1];
      const evictedValueSequence = elementPowerSequences.get(valueToEvict);
      const oldEvictedContribution =
        evictedValueSequence[evictedValueSequence.length - 1];
      currentWindowSumScore =
        (currentWindowSumScore - oldEvictedContribution + calculationModulus) %
        calculationModulus;

      evictedValueSequence.pop();

      if (evictedValueSequence.length > 0) {
        currentWindowSumScore =
          (currentWindowSumScore +
            evictedValueSequence[evictedValueSequence.length - 1]) %
          calculationModulus;
      }
    }
  }

  return overallMaximumScore;
};
