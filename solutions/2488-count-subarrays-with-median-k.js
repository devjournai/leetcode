/**
 * Count Subarrays With Median K
 * Intuition: Convert the problem into counting subarrays where the balance of elements greater than K vs. less than K is 0 or 1. Iterate from K's position to the right, storing balances. Then iterate from K's position to the left, calculating current balance and looking up required balances from the right.
 * Approach: 1. Find the index of K. 2. Initialize a map to store frequencies of balance sums for subarrays extending to the right of K. Initialize with `[0, 1]` for the empty right segment. 3. Iterate from `kIndex + 1` to the end of the array, calculating a running balance where elements `>K` add `1` and elements `<K` subtract `1`. Store these balances and their counts in the map. 4. Initialize another running balance for the left side (including K). Iterate from `kIndex` down to the start of the array. For this balance, elements `>K` subtract `1`, `elements <K` add `1`, and `K` itself adds `0`. 5. For each left-side balance, add the counts from the map for `balance` and `balance + 1` to the total result, as these combinations satisfy the median condition.
 * Dry Run: nums = [2,3,1,4], k = 2
 *   arrayLength = 4, indexOfK = 0
 *   rightBalanceMap = Map([[0, 1]])
 *   currentRightBalance = 0
 *   totalSubarraysCount = 0
 *
 *   Pass 1 (Right of K, firstLoopIndex from 1 to 3):
 *   - firstLoopIndex = 1 (nums[1]=3): 3 > 2, currentRightBalance = 1. rightBalanceMap = Map([[0,1], [1,1]])
 *   - firstLoopIndex = 2 (nums[2]=1): 1 < 2, currentRightBalance = 0. rightBalanceMap = Map([[0,2], [1,1]])
 *   - firstLoopIndex = 3 (nums[3]=4): 4 > 2, currentRightBalance = 1. rightBalanceMap = Map([[0,2], [1,2]])
 *
 *   Pass 2 (Left of K, secondLoopIndex from 0 down to 0):
 *   - leftBalanceAccumulator = 0 (initial)
 *   - secondLoopIndex = 0 (nums[0]=2): nums[0] == k, leftBalanceAccumulator remains 0.
 *     - totalSubarraysCount += rightBalanceMap.get(0) || 0  => totalSubarraysCount += 2 (now 2)
 *     - totalSubarraysCount += rightBalanceMap.get(0 + 1) || 0 => totalSubarraysCount += 2 (now 4)
 *
 *   Return totalSubarraysCount = 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countSubarrays = function (nums, k) {
  const arrayLength = nums.length;
  const indexOfK = nums.indexOf(k);
  const rightBalanceMap = new Map();
  rightBalanceMap.set(0, 1);
  let currentRightBalance = 0;
  let totalSubarraysCount = 0;

  for (
    let firstLoopIndex = indexOfK + 1;
    firstLoopIndex < arrayLength;
    firstLoopIndex++
  ) {
    currentRightBalance += nums[firstLoopIndex] > k ? 1 : -1;
    rightBalanceMap.set(
      currentRightBalance,
      (rightBalanceMap.get(currentRightBalance) || 0) + 1
    );
  }

  let leftBalanceAccumulator = 0;
  for (
    let secondLoopIndex = indexOfK;
    secondLoopIndex >= 0;
    secondLoopIndex--
  ) {
    leftBalanceAccumulator +=
      nums[secondLoopIndex] > k ? -1 : nums[secondLoopIndex] < k ? 1 : 0;
    totalSubarraysCount += rightBalanceMap.get(leftBalanceAccumulator) || 0;
    totalSubarraysCount += rightBalanceMap.get(leftBalanceAccumulator + 1) || 0;
  }

  return totalSubarraysCount;
};
