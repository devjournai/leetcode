/**
 * 3Sum Closest
 * Intuition: Sort, then for each fixed first element two-pointer the remainder, tracking the sum whose absolute distance to `target` is smallest (and return immediately on an exact hit).
 * Approach: 1. Sort `nums` and set `closestSum` to Infinity. 2. For each `firstPointer`, two-pointer `secondPointer`/`thirdPointer`. 3. Update `closestSum` when `currentSum` is closer to `target`. 4. Move second up if sum is too small, third down if too large, or return `target` if equal. 5. Return `closestSum`.
 * Dry Run: nums = [-1, 2, 1, -4], target = 1 → sorted [-4,-1,1,2].
 *   - first=-4,  -1+2=1, currentSum=-3, closer than ∞. Then -4+-1+2=-3 vs -4+1+2=-1, closestSum=-1. Later first=-1, -1+1+2=2, |2-1|<|-1-1| → closestSum=2. Return 2.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  let closestSum = Infinity;

  for (let firstPointer = 0; firstPointer < nums.length - 2; firstPointer++) {
    let secondPointer = firstPointer + 1;
    let thirdPointer = nums.length - 1;

    while (secondPointer < thirdPointer) {
      const currentSum =
        nums[firstPointer] + nums[secondPointer] + nums[thirdPointer];

      if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
        closestSum = currentSum;
      }

      if (currentSum < target) {
        secondPointer++;
      } else if (currentSum > target) {
        thirdPointer--;
      } else {
        return target;
      }
    }
  }

  return closestSum;
};
