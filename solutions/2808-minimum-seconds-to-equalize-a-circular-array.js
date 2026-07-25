/**
 * Minimum Seconds to Equalize a Circular Array
 *
 * Intuition:
 * Suppose we decide that eventually every element should become some value x
 * that already exists in nums.
 *
 * Every occurrence of x can spread to its left and right by one position
 * per second.
 *
 * Therefore, the time needed for x to fill the entire circular array depends
 * on the largest gap between two consecutive occurrences of x.
 *
 * If two occurrences of x are `gap` indices apart, the positions between
 * them can be filled simultaneously from both sides.
 *
 * The required time for that gap is:
 *
 *      floor(gap / 2)
 *
 * Because the array is circular, we must also consider the gap between the
 * last occurrence and the first occurrence through the end of the array.
 *
 * We calculate this value for every distinct number and take the minimum.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Store all indices of each value using a Map.
 *
 *      value -> [index1, index2, ...]
 *
 * 2. For every distinct value:
 *
 *      • Find the maximum distance between consecutive occurrences.
 *
 *      • Also calculate the circular distance:
 *
 *            firstIndex + n - lastIndex
 *
 * 3. If the maximum distance is maxGap, this value can spread across the
 *    whole array in:
 *
 *            floor(maxGap / 2)
 *
 *    seconds.
 *
 * 4. Take the minimum across all possible target values.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [2,1,3,3,2]
 *
 * For value 2:
 *
 *      positions = [0,4]
 *
 * Gaps:
 *
 *      4 - 0 = 4
 *      0 + 5 - 4 = 1
 *
 * maxGap = 4
 *
 * seconds = floor(4 / 2)
 *         = 2
 *
 *
 * For value 3:
 *
 *      positions = [2,3]
 *
 * Gaps:
 *
 *      3 - 2 = 1
 *      2 + 5 - 3 = 4
 *
 * maxGap = 4
 *
 * seconds = 2
 *
 * Therefore:
 *
 *      answer = 2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var minimumSeconds = function (nums) {
  const n = nums.length;
  const positions = new Map();

  for (let i = 0; i < n; i++) {
    if (!positions.has(nums[i])) {
      positions.set(nums[i], []);
    }

    positions.get(nums[i]).push(i);
  }

  let answer = Infinity;

  for (const indices of positions.values()) {
    let maxGap = 0;

    for (let i = 1; i < indices.length; i++) {
      maxGap = Math.max(maxGap, indices[i] - indices[i - 1]);
    }

    maxGap = Math.max(maxGap, indices[0] + n - indices[indices.length - 1]);

    answer = Math.min(answer, Math.floor(maxGap / 2));
  }

  return answer;
};
