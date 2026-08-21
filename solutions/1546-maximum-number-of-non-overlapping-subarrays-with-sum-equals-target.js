/**
 * Maximum Number Of Non Overlapping Subarrays With Sum Equals Target
 * Intuition: Greedy earliest ending subarray with sum target, then reset the prefix map so later arrays cannot overlap.
 * Approach: 1. Map prefix→index, start 0. 2. If prefix-target seen, count++, clear map, reset prefix. 3. Else store prefix.
 * Dry Run: nums = [1,1,1,1,1], target = 2.
 *   - Take [1,1] twice → 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxNonOverlapping = function (nums, target) {
  const sumTracker = new Map();
  let currentAccumulatedSum = 0;
  let nonOverlappingCount = 0;

  sumTracker.set(0, 0);

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    currentAccumulatedSum += nums[elementIndex];

    const neededSumForTarget = currentAccumulatedSum - target;
    if (sumTracker.has(neededSumForTarget)) {
      nonOverlappingCount++;
      sumTracker.clear();
      currentAccumulatedSum = 0;
      sumTracker.set(0, elementIndex + 1);
    } else {
      sumTracker.set(currentAccumulatedSum, elementIndex + 1);
    }
  }

  return nonOverlappingCount;
};
