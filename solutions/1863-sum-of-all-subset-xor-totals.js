/**
 * Sum Of All Subset Xor Totals
 * Intuition: Every subset XOR contributes to the answer. Recurse include/exclude each element, adding the XOR when the index reaches n.
 * Approach: 1. `backtrackAndCalculate(currentPosition, currentXorResult)`: skip nums[i] or XOR it in. 2. At the end, add `currentXorResult` to `accumulatedTotalXorSum`.
 * Dry Run: nums=[1,3]. Subsets []=0, [1]=1, [3]=3, [1,3]=2. Sum=6.
 * Time Complexity: O(2^N)
 * Space Complexity: O(N)
 */
var subsetXORSum = function (nums) {
  let accumulatedTotalXorSum = 0;

  const backtrackAndCalculate = (currentPosition, currentXorResult) => {
    if (currentPosition === nums.length) {
      accumulatedTotalXorSum += currentXorResult;
      return;
    }

    backtrackAndCalculate(currentPosition + 1, currentXorResult);

    const xorWithCurrentElement = currentXorResult ^ nums[currentPosition];
    backtrackAndCalculate(currentPosition + 1, xorWithCurrentElement);
  };

  backtrackAndCalculate(0, 0);

  return accumulatedTotalXorSum;
};
