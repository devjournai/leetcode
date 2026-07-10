/**
 * Minimum Number of Operations to Make All Array Elements Equal to 1
 *
 * Intuition:
 * There are two cases.
 *
 * 1. If the array already contains one or more 1's,
 *    every remaining element can become 1 in exactly one operation.
 *
 * 2. Otherwise, we must first create the first 1.
 *
 *    A subarray whose GCD is 1 can be reduced to a single 1.
 *    If its length is L, creating that first 1 requires:
 *
 *          L - 1
 *
 *    operations.
 *
 *    After obtaining one 1, every other element becomes 1 in one operation.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Count the number of existing 1's.
 *
 * 2. If at least one 1 exists:
 *
 *      Answer =
 *
 *          n - countOfOnes
 *
 * 3. Otherwise,
 *    enumerate every subarray.
 *
 *      Maintain the running GCD.
 *
 *      Whenever the GCD becomes 1,
 *      update the minimum subarray length.
 *
 * 4. If no subarray has GCD 1,
 *      return -1.
 *
 * 5. Otherwise:
 *
 *      Create the first 1:
 *
 *          minimumLength - 1
 *
 *      Convert remaining elements:
 *
 *          n - 1
 *
 *      Total:
 *
 *          (minimumLength - 1)
 *          +
 *          (n - 1)
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [2,6,3,4]
 *
 * No existing 1.
 *
 * Smallest subarray
 * with GCD = 1:
 *
 * [3,4]
 *
 * Length = 2
 *
 * Create first 1:
 *
 * 2-1 =1 operation
 *
 * Convert remaining
 * 3 elements:
 *
 * 3 operations
 *
 * Total:
 *
 * 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N² logM)
 * Space Complexity: O(1)
 */

var minOperations = function (nums) {
  const n = nums.length;

  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  };

  let ones = 0;

  for (const num of nums) {
    if (num === 1) {
      ones++;
    }
  }

  if (ones > 0) {
    return n - ones;
  }

  let minimumLength = Infinity;

  for (let left = 0; left < n; left++) {
    let currentGcd = nums[left];

    for (let right = left; right < n; right++) {
      currentGcd = gcd(currentGcd, nums[right]);

      if (currentGcd === 1) {
        minimumLength = Math.min(minimumLength, right - left + 1);

        break;
      }
    }
  }

  if (minimumLength === Infinity) {
    return -1;
  }

  return minimumLength - 1 + (n - 1);
};
