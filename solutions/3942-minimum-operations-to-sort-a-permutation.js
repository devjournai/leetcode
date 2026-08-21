/**
 * Minimum Operations to Sort a Permutation
 * Intuition: We first find the position of 0 in the array, denoted as zero.
 * Approach: We first find the position of 0 in the array, denoted as zero. Next, we check whether the sequence is increasing when traversing right from 0, and whether it is increasing when traversing left from 0. If it is increasing to the right from 0, we can sort the array in either of the following two ways:
 * Dry Run: Input: nums = [0,2,1]. Output: 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  const n = nums.length;

  const zero = nums.indexOf(0);

  const check = (step) => {
    for (let i = 1; i < n; i++) {
      const prev = (zero + (i - 1) * step + n) % n;
      const curr = (zero + i * step + n) % n;

      if (nums[prev] > nums[curr]) {
        return false;
      }
    }

    return true;
  };

  let ans = Number.MAX_SAFE_INTEGER;

  if (check(1)) {
    ans = Math.min(ans, zero);
    ans = Math.min(ans, n - zero + 2);
  }

  if (check(-1)) {
    ans = Math.min(ans, zero + 2);
    ans = Math.min(ans, n - zero);
  }

  return ans === Number.MAX_SAFE_INTEGER ? -1 : ans;
};
