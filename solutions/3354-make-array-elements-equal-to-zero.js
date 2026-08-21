/**
 * Make Array Elements Equal to Zero
 * Intuition: Starting on a 0, you decrement the cell you land on and bounce at the ends. The process zeros the array iff the sums on the two sides of the start differ by at most 1 (equal → both directions work; off-by-one → only walk toward the larger side).
 * Approach: 1. Let `suffix` be the total sum and `prefix` start at 0. 2. For each index, move `nums[i]` from suffix to prefix. 3. Skip positive cells. 4. If `prefix === suffix`, add 2; if they differ by 1, add 1. 5. Return the total valid starts.
 * Dry Run: nums = [1, 0, 2, 0, 3]
 *   i=1 (0): prefix=1, suffix=5, |1-5|!=0/1
 *   i=3 (0): prefix=3, suffix=3, equal → +2. Answer 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countValidSelections = function (nums) {
  let validStartCount = 0;
  let prefixSum = 0;
  let suffixSum = 0;
  for (const value of nums) {
    suffixSum += value;
  }

  for (let index = 0; index < nums.length; index++) {
    suffixSum -= nums[index];
    prefixSum += nums[index];
    if (nums[index] > 0) {
      continue;
    }
    if (prefixSum === suffixSum) {
      validStartCount += 2;
    }
    if (Math.abs(prefixSum - suffixSum) === 1) {
      validStartCount += 1;
    }
  }

  return validStartCount;
};
