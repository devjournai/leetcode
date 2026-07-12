/**
 * Sum in a Matrix
 *
 * Intuition:
 * In every operation, each row removes its current largest element.
 *
 * If every row is sorted in ascending order, then the largest remaining
 * element of each row is always at the end.
 *
 * Thus, after sorting:
 *
 * • Process columns from right to left.
 * • For each column, find the maximum value among all rows.
 * • Add that maximum to the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort every row in ascending order.
 *
 * 2. Initialize:
 *
 *      answer = 0
 *
 * 3. Traverse columns from right to left.
 *
 * 4. For each column:
 *
 *      Find the maximum value among all rows.
 *
 * 5. Add the maximum to the answer.
 *
 * 6. Return the final answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [
 *  [7,2,1],
 *  [6,4,2],
 *  [6,5,3],
 *  [3,2,1]
 * ]
 *
 * After sorting:
 *
 * [
 *  [1,2,7],
 *  [2,4,6],
 *  [3,5,6],
 *  [1,2,3]
 * ]
 *
 * Last column:
 *
 * 7
 * 6
 * 6
 * 3
 *
 * Maximum = 7
 *
 * Middle column:
 *
 * 2
 * 4
 * 5
 * 2
 *
 * Maximum = 5
 *
 * First column:
 *
 * 1
 * 2
 * 3
 * 1
 *
 * Maximum = 3
 *
 * Answer:
 *
 * 7 + 5 + 3 = 15
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(M × N log N)
 * Space Complexity: O(1)
 */

var matrixSum = function (nums) {
  const rows = nums.length;
  const cols = nums[0].length;

  for (let i = 0; i < rows; i++) {
    nums[i].sort((a, b) => a - b);
  }

  let answer = 0;

  for (let col = cols - 1; col >= 0; col--) {
    let maximum = 0;

    for (let row = 0; row < rows; row++) {
      maximum = Math.max(maximum, nums[row][col]);
    }

    answer += maximum;
  }

  return answer;
};
