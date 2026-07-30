/**
 * Minimum Operations to Make a Special Number
 *
 * Intuition:
 * A number is divisible by 25 if and only if its last two digits are one of:
 *
 *      "00"
 *      "25"
 *      "50"
 *      "75"
 *
 * Since we can only delete digits, the relative order of the remaining digits
 * cannot change.
 *
 * Therefore, for each valid ending, we try to keep those two digits as the
 * last digits of the number while deleting the minimum number of digits.
 *
 * We search from right to left:
 *
 * • Find the second digit of the ending.
 * • Then find the first digit before it.
 *
 * Once both digits are found, the required deletions are:
 *
 *      Digits after the second digit
 *      +
 *      Digits between the two selected digits
 *
 * We compute this for all four valid endings and take the minimum.
 *
 * There is one special case:
 *
 * If no valid two-digit ending can be formed, we may delete every digit except
 * one '0', resulting in the number 0, which is also divisible by 25.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Initialize the answer as deleting all digits.
 *
 * 2. For each ending:
 *
 *      • "00"
 *      • "25"
 *      • "50"
 *      • "75"
 *
 *      Search backwards for the second digit.
 *
 *      Then search backwards for the first digit.
 *
 *      If both are found:
 *
 *          deletions =
 *              (digits after second digit)
 *              +
 *              (digits between first and second digit)
 *
 *      Update the minimum answer.
 *
 * 3. Check whether the string contains '0'.
 *
 *      If yes:
 *
 *          Delete every other digit.
 *
 * 4. Return the minimum operations.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * num = "2245047"
 *
 * Try ending "50"
 *
 * Find:
 *
 *      '0' at index 4
 *
 * Find:
 *
 *      '5' at index 3
 *
 * Deletions:
 *
 *      After '0':
 *
 *          2
 *
 *      Between:
 *
 *          0
 *
 * Total:
 *
 *      2
 *
 * Answer = 2
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var minimumOperations = function (num) {
  const endings = ["00", "25", "50", "75"];
  const n = num.length;

  let answer = n;

  for (const ending of endings) {
    let second = -1;
    let first = -1;

    for (let i = n - 1; i >= 0; i--) {
      if (num[i] === ending[1]) {
        second = i;
        break;
      }
    }

    if (second === -1) continue;

    for (let i = second - 1; i >= 0; i--) {
      if (num[i] === ending[0]) {
        first = i;
        break;
      }
    }

    if (first === -1) continue;

    const deletions = n - 1 - second + (second - first - 1);

    answer = Math.min(answer, deletions);
  }

  if (num.includes("0")) {
    answer = Math.min(answer, n - 1);
  }

  return answer;
};
