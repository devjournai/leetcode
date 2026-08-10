/**
 * Minimum Size Subarray in Infinite Array
 *
 * Intuition:
 * The array repeats infinitely.
 *
 * Let:
 *
 *      total = sum(nums)
 *
 * If target is very large, the shortest subarray will contain several complete
 * copies of nums plus one remaining partial subarray.
 *
 * Suppose:
 *
 *      target = q * total + rem
 *
 * Then:
 *
 * • We must take q complete copies.
 * • We only need to find the shortest subarray whose sum equals rem.
 *
 * However, sometimes taking one fewer complete copy produces a shorter answer.
 * Therefore, we also check:
 *
 *      rem + total
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * Since all numbers are positive, the shortest subarray with a given sum can
 * be found using a sliding window.
 *
 * To allow wrap-around, duplicate the array once:
 *
 *      nums + nums
 *
 * Any partial subarray spans at most two copies.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute:
 *
 *      total = sum(nums)
 *
 * 2. Let:
 *
 *      full = Math.floor(target / total)
 *      rem  = target % total
 *
 * 3. Use sliding window on nums + nums to find:
 *
 *      shortest(rem)
 *
 *      shortest(rem + total)
 *
 * 4. Candidate answers:
 *
 *      full * n + shortest(rem)
 *
 *      (full - 1) * n + shortest(rem + total)
 *          (only if full > 0)
 *
 * 5. Return the minimum valid answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [1,2,3]
 * target = 8
 *
 * total = 6
 *
 * full = 1
 * rem = 2
 *
 * shortest(2) = 1
 *
 * answer =
 *
 *      1 * 3 + 1 = 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var minSizeSubarray = function (nums, target) {
  const n = nums.length;

  const total = nums.reduce((sum, value) => sum + value, 0);

  const full = Math.floor(target / total);
  const rem = target % total;

  const arr = nums.concat(nums);

  const shortest = (need) => {
    if (need === 0) {
      return 0;
    }

    let left = 0;
    let sum = 0;
    let best = Infinity;

    for (let right = 0; right < arr.length; right++) {
      sum += arr[right];

      while (sum > need) {
        sum -= arr[left++];
      }

      if (sum === need) {
        best = Math.min(best, right - left + 1);
      }
    }

    return best;
  };

  let answer = Infinity;

  const len1 = shortest(rem);

  if (len1 !== Infinity) {
    answer = Math.min(answer, full * n + len1);
  }

  if (full > 0) {
    const len2 = shortest(rem + total);

    if (len2 !== Infinity) {
      answer = Math.min(answer, (full - 1) * n + len2);
    }
  }

  return answer === Infinity ? -1 : answer;
};
