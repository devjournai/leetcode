/**
 * Minimum Operations to Form Subsequence With Target Sum
 *
 * Intuition:
 * Every number in nums is a power of two.
 *
 * Let:
 *
 *      cnt[i]
 *
 * denote how many numbers equal:
 *
 *      2^i
 *
 * We process the bits of target from the least significant bit to the most
 * significant bit.
 *
 * For every bit:
 *
 * • If we already have enough pieces of this power, use one.
 *
 * • Otherwise, we must split a larger power until we obtain the required
 *   smaller power.
 *
 * Splitting:
 *
 *      2^j
 *          ↓
 *      2^(j-1), 2^(j-1)
 *
 * Each split costs exactly one operation.
 *
 * Therefore, if we need one piece of 2^i but none exists, we search for the
 * nearest higher power 2^j. Splitting it down to level i requires:
 *
 *      j - i
 *
 * operations.
 *
 * After processing each bit, any remaining pairs of the same power can be
 * merged conceptually into the next power because:
 *
 *      two 2^i = one 2^(i+1)
 *
 * This carry helps satisfy higher bits later.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Count the occurrences of every power of two.
 *
 * 2. If the total sum of nums is smaller than target,
 *    return -1 immediately.
 *
 * 3. Process bits from 0 to 30.
 *
 * 4. If target needs bit i:
 *
 *      • If cnt[i] > 0:
 *            use one.
 *
 *      • Otherwise:
 *            find the nearest j > i with cnt[j] > 0.
 *
 *            Split:
 *
 *                2^j → ... → 2^i
 *
 *            Cost:
 *
 *                j - i
 *
 *            Update counts after every split.
 *
 * 5. Carry unused pieces upward:
 *
 *      cnt[i + 1] += floor(cnt[i] / 2)
 *
 * 6. Return the total operations.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [1,2,8]
 * target = 7
 *
 * Counts:
 *
 *      2^0 : 1
 *      2^1 : 1
 *      2^3 : 1
 *
 * Bit 0 needed:
 *
 *      use one 1
 *
 * Bit 1 needed:
 *
 *      use one 2
 *
 * Bit 2 needed:
 *
 *      none available
 *
 * Find:
 *
 *      2^3
 *
 * Split:
 *
 *      8 → 4 + 4
 *
 * Operations = 1
 *
 * Use one 4.
 *
 * Answer = 1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(31²)
 * Space Complexity: O(31)
 */

var minOperations = function (nums, target) {
  const cnt = new Array(31).fill(0);

  let total = 0;

  for (const num of nums) {
    total += num;
    cnt[Math.log2(num)]++;
  }

  if (total < target) {
    return -1;
  }

  let operations = 0;

  for (let i = 0; i < 31; i++) {
    if ((target >> i) & 1) {
      if (cnt[i] > 0) {
        cnt[i]--;
      } else {
        let j = i + 1;

        while (j < 31 && cnt[j] === 0) {
          j++;
        }

        while (j > i) {
          cnt[j]--;
          cnt[j - 1] += 2;
          operations++;
          j--;
        }

        cnt[i]--;
      }
    }

    if (i < 30) {
      cnt[i + 1] += Math.floor(cnt[i] / 2);
    }
  }

  return operations;
};
