/**
 * Visit Array Positions to Maximize Score
 *
 * Intuition:
 * From any position, we may jump to any later position.
 * The only thing that matters when moving is whether the parity
 * (even/odd) changes, since changing parity costs x.
 *
 * Therefore, instead of remembering every previous position,
 * we only need to know the best score obtained so far ending with:
 *
 *      • an even number
 *      • an odd number
 *
 * Let:
 *
 *      evenScore = maximum score ending at an even value
 *      oddScore  = maximum score ending at an odd value
 *
 * When processing a new number:
 *
 * • Continue from the same parity without paying x.
 * • Or come from the opposite parity and pay x.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Initialize:
 *
 *      If nums[0] is even:
 *
 *          evenScore = nums[0]
 *          oddScore  = -Infinity
 *
 *      Otherwise:
 *
 *          oddScore  = nums[0]
 *          evenScore = -Infinity
 *
 * 2. Traverse the remaining elements.
 *
 * 3. If nums[i] is even:
 *
 *      best =
 *          max(
 *              evenScore,
 *              oddScore - x
 *          ) + nums[i]
 *
 *      Update evenScore.
 *
 * 4. If nums[i] is odd:
 *
 *      best =
 *          max(
 *              oddScore,
 *              evenScore - x
 *          ) + nums[i]
 *
 *      Update oddScore.
 *
 * 5. The answer is:
 *
 *      max(evenScore, oddScore)
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [2,3,6,1,9,2]
 * x = 5
 *
 * Start:
 *
 * even = 2
 * odd  = -∞
 *
 * Visit 3:
 *
 * max(-∞, 2-5) + 3 = 0
 *
 * even = 2
 * odd = 0
 *
 * Visit 6:
 *
 * max(2, 0-5) + 6 = 8
 *
 * even = 8
 *
 * Visit 1:
 *
 * max(0, 8-5) + 1 = 4
 *
 * odd = 4
 *
 * Visit 9:
 *
 * max(4, 8-5) + 9 = 13
 *
 * odd = 13
 *
 * Visit 2:
 *
 * max(8, 13-5) + 2 = 10
 *
 * even = 10
 *
 * Answer:
 *
 * max(10,13) = 13
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var maxScore = function (nums, x) {
  let evenScore = -Infinity;
  let oddScore = -Infinity;

  if (nums[0] % 2 === 0) {
    evenScore = nums[0];
  } else {
    oddScore = nums[0];
  }

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      const best = Math.max(evenScore, oddScore - x) + nums[i];

      evenScore = Math.max(evenScore, best);
    } else {
      const best = Math.max(oddScore, evenScore - x) + nums[i];

      oddScore = Math.max(oddScore, best);
    }
  }

  return Math.max(evenScore, oddScore);
};
