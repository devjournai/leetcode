/**
 * Maximum Frequency After Subarray Operation
 * Intuition: One subarray can be incremented so that every occurrence of some value `target` becomes k. That is Kadane on +1 for target and -1 for existing k (those k's are overwritten).
 * Approach: 1. Count how many k already exist. 2. For each target 1..50 except k, run Kadane for the best net gain. 3. Answer is original k-count plus the best gain.
 * Dry Run: nums = [1,2,3,2,1], k = 1. Turning a run of 2s into 1s: +1,-1,+1 for the middle 2,3,2... best gain 1 from a single 2. Total freq of 1 becomes 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var maxFrequency = function (nums, k) {
  const kadane = (target) => {
    let maxGain = 0;
    let gain = 0;
    for (const value of nums) {
      if (value === target) {
        gain++;
      } else if (value === k) {
        gain--;
      }
      if (gain < 0) {
        gain = 0;
      }
      maxGain = Math.max(maxGain, gain);
    }
    return maxGain;
  };

  let bestGain = 0;
  for (let target = 1; target <= 50; target++) {
    if (target !== k) {
      bestGain = Math.max(bestGain, kadane(target));
    }
  }
  return nums.filter((value) => value === k).length + bestGain;
};
