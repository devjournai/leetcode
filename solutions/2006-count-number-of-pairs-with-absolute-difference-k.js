/**
 * Count Number Of Pairs With Absolute Difference K
 * Intuition: Pairs (a, b) where the absolute difference |a-b| equals k mean that b must be a+k or a must be b+k. We can efficiently count frequencies of all numbers in the input array. Then, for each unique number `a`, we only need to check if `a+k` exists in our counts. This approach naturally handles `i < j` by ensuring we only count each pair of distinct values once, and by applying specific logic for `k=0` to count pairs of identical values correctly.
 * Approach:
 * 1. Initialize a `numberFrequencies` map. This map will store each unique number from the input array `nums` as a key and its count as the value.
 * 2. Iterate through each `currentNumberElement` in the `nums` array. For each element, update its frequency in the `numberFrequencies` map. If an element is encountered for the first time, initialize its count to 1; otherwise, increment its existing count.
 * 3. Initialize a `totalAbsoluteDifferencePairs` variable to 0. This variable will accumulate the final count of pairs satisfying the condition.
 * 4. Iterate through each `uniqueNumberKey` (which is a key) present in the `numberFrequencies` map.
 * 5. For each `uniqueNumberKey`, calculate the `requiredPairValue` which would satisfy the difference condition: `requiredPairValue = uniqueNumberKey + k`.
 * 6. Check if `requiredPairValue` exists as a key in the `numberFrequencies` map.
 * 7. If `requiredPairValue` exists:
 *    a. If `k` is 0 (meaning `uniqueNumberKey` is equal to `requiredPairValue`), we need to count pairs of identical numbers. For a number appearing `F` times, there are `F * (F - 1) / 2` pairs of distinct indices `(i, j)` where `nums[i] == nums[j]`. Add this value to `totalAbsoluteDifferencePairs`.
 *    b. If `k` is not 0 (meaning `uniqueNumberKey` and `requiredPairValue` are distinct), then any `uniqueNumberKey` can pair with any `requiredPairValue`. The total number of such pairs is the product of their frequencies: `numberFrequencies.get(uniqueNumberKey) * numberFrequencies.get(requiredPairValue)`. Add this product to `totalAbsoluteDifferencePairs`. This correctly counts all combinations of indices `(i, j)` with `i < j` without double-counting, because we only check for `uniqueNumberKey + k` (which is always greater than or equal to `uniqueNumberKey` since `k >= 0`).
 * 8. After iterating through all unique number keys, return the accumulated `totalAbsoluteDifferencePairs`.
 * Dry Run: nums = [3,2,1,5,4], k = 2
 * 1. Initialize numberFrequencies = new Map().
 * 2. Populate numberFrequencies:
 *    - currentNumberElement = 3: numberFrequencies.set(3, 1)
 *    - currentNumberElement = 2: numberFrequencies.set(2, 1)
 *    - currentNumberElement = 1: numberFrequencies.set(1, 1)
 *    - currentNumberElement = 5: numberFrequencies.set(5, 1)
 *    - currentNumberElement = 4: numberFrequencies.set(4, 1)
 *    After this loop, numberFrequencies is: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1}.
 * 3. Initialize totalAbsoluteDifferencePairs = 0.
 * 4. Iterate through uniqueNumberKey in numberFrequencies.keys():
 *    - uniqueNumberKey = 1:
 *        requiredPairValue = 1 + 2 = 3.
 *        numberFrequencies.has(3) is true.
 *        k (2) is not 0.
 *        totalAbsoluteDifferencePairs += numberFrequencies.get(1) * numberFrequencies.get(3) = 1 * 1 = 1. (Pair (1,3))
 *    - uniqueNumberKey = 2:
 *        requiredPairValue = 2 + 2 = 4.
 *        numberFrequencies.has(4) is true.
 *        k (2) is not 0.
 *        totalAbsoluteDifferencePairs += numberFrequencies.get(2) * numberFrequencies.get(4) = 1 * 1 = 1. (Pair (2,4))
 *    - uniqueNumberKey = 3:
 *        requiredPairValue = 3 + 2 = 5.
 *        numberFrequencies.has(5) is true.
 *        k (2) is not 0.
 *        totalAbsoluteDifferencePairs += numberFrequencies.get(3) * numberFrequencies.get(5) = 1 * 1 = 1. (Pair (3,5))
 *    - uniqueNumberKey = 4:
 *        requiredPairValue = 4 + 2 = 6.
 *        numberFrequencies.has(6) is false.
 *    - uniqueNumberKey = 5:
 *        requiredPairValue = 5 + 2 = 7.
 *        numberFrequencies.has(7) is false.
 * 5. Final totalAbsoluteDifferencePairs = 1 + 1 + 1 = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var countKDifference = function (nums, k) {
  const numberFrequencies = new Map();

  for (const currentNumberElement of nums) {
    numberFrequencies.set(
      currentNumberElement,
      (numberFrequencies.get(currentNumberElement) || 0) + 1
    );
  }

  let totalAbsoluteDifferencePairs = 0;

  for (const uniqueNumberKey of numberFrequencies.keys()) {
    const requiredPairValue = uniqueNumberKey + k;

    if (numberFrequencies.has(requiredPairValue)) {
      if (k === 0) {
        const countOfCurrent = numberFrequencies.get(uniqueNumberKey);
        totalAbsoluteDifferencePairs +=
          (countOfCurrent * (countOfCurrent - 1)) / 2;
      } else {
        totalAbsoluteDifferencePairs +=
          numberFrequencies.get(uniqueNumberKey) *
          numberFrequencies.get(requiredPairValue);
      }
    }
  }

  return totalAbsoluteDifferencePairs;
};
