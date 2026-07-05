/**
 * Find Score of an Array After Marking All Elements
 *
 * Intuition:
 * At every step we must choose the smallest unmarked element.
 * If multiple elements have the same value, choose the one with the
 * smallest index.
 *
 * Instead of repeatedly searching the array, sort all elements once by:
 *
 *      1. Value
 *      2. Index
 *
 * Then process them in that order while maintaining which indices have
 * already been marked.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Create an array:
 *
 *      [value, index]
 *
 *      for every element.
 *
 * 2. Sort by:
 *
 *      • Smaller value first.
 *      • If values are equal,
 *        smaller index first.
 *
 * 3. Maintain:
 *
 *      marked[index]
 *
 *      indicating whether an index has already been marked.
 *
 * 4. Traverse the sorted array.
 *
 *      If the current index is already marked,
 *      skip it.
 *
 *      Otherwise:
 *
 *      • Add its value to the answer.
 *      • Mark:
 *
 *            index-1
 *            index
 *            index+1
 *
 *        whenever they exist.
 *
 * 5. Return the final score.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 * [2,1,3,4,5,2]
 *
 * Sorted:
 *
 * (1,1)
 * (2,0)
 * (2,5)
 * (3,2)
 * (4,3)
 * (5,4)
 *
 * --------------------
 *
 * Pick:
 *
 * (1,1)
 *
 * score = 1
 *
 * Mark:
 *
 * 0,1,2
 *
 * --------------------
 *
 * (2,0)
 *
 * already marked
 *
 * Skip
 *
 * --------------------
 *
 * Pick:
 *
 * (2,5)
 *
 * score = 3
 *
 * Mark:
 *
 * 4,5
 *
 * --------------------
 *
 * Pick:
 *
 * (4,3)
 *
 * score = 7
 *
 * Mark:
 *
 * 2,3,4
 *
 * Return:
 *
 * 7
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var findScore = function (nums) {
  const n = nums.length;

  const elements = [];

  for (let i = 0; i < n; i++) {
    elements.push([nums[i], i]);
  }

  elements.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }

    return a[1] - b[1];
  });

  const marked = new Array(n).fill(false);

  let score = 0n;

  for (const [value, index] of elements) {
    if (marked[index]) {
      continue;
    }

    score += BigInt(value);

    marked[index] = true;

    if (index > 0) {
      marked[index - 1] = true;
    }

    if (index + 1 < n) {
      marked[index + 1] = true;
    }
  }

  return Number(score);
};
