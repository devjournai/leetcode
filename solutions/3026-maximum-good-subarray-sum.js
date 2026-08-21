/**
 * Maximum Good Subarray Sum
 * Intuition: A good subarray has |first-last| = k. For each ending value, we want the prefix sum minus the minimum prefix before a matching start value (end±k).
 * Approach: 1. Track min prefix sum seen for each value. 2. Scan with running prefix. 3. For nums[i], candidate starts are nums[i]+k and nums[i]-k. 4. Update answer with prefix - minPrefix[start]. 5. Then store prefix-nums[i] as start prefix for nums[i] (prefix before current).
 * Dry Run:
 *   nums = [1,2,3,4,5,6], k = 1. Subarray [1,2] sum 3 etc. Best full adjacent pairs grow; actually [1..6] first-last=5. Sample: [1,2,3,4] k=2 good [1,2,3] sum 6.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumSubarraySum = function (nums, k) {
  const minPrefixByValue = new Map();
  let runningPrefix = 0;
  let maxGoodSum = -Infinity;
  for (const currentValue of nums) {
    const prefixBeforeCurrent = runningPrefix;
    if (minPrefixByValue.has(currentValue + k)) {
      maxGoodSum = Math.max(
        maxGoodSum,
        prefixBeforeCurrent +
          currentValue -
          minPrefixByValue.get(currentValue + k)
      );
    }
    if (minPrefixByValue.has(currentValue - k)) {
      maxGoodSum = Math.max(
        maxGoodSum,
        prefixBeforeCurrent +
          currentValue -
          minPrefixByValue.get(currentValue - k)
      );
    }
    const previousMin = minPrefixByValue.has(currentValue)
      ? minPrefixByValue.get(currentValue)
      : Infinity;
    minPrefixByValue.set(
      currentValue,
      Math.min(previousMin, prefixBeforeCurrent)
    );
    runningPrefix += currentValue;
  }
  return maxGoodSum === -Infinity ? 0 : maxGoodSum;
};
