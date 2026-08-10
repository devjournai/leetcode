/**
 * Find Indices With Index and Value Difference II
 *
 * Intuition:
 * For every index j, we need an index i such that:
 *
 *      |i - j| >= indexDifference
 *
 * While scanning from left to right, every index
 *
 *      i <= j - indexDifference
 *
 * is already valid.
 *
 * Among those valid indices, only the smallest and largest values matter.
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * Maintain:
 *
 *      minValue, minIndex
 *      maxValue, maxIndex
 *
 * for all indices that are far enough from the current index.
 *
 * For every j:
 *
 * If
 *
 *      nums[j] - minValue >= valueDifference
 *
 * return
 *
 *      [minIndex, j]
 *
 * or if
 *
 *      maxValue - nums[j] >= valueDifference
 *
 * return
 *
 *      [maxIndex, j]
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var findIndices = function (nums, indexDifference, valueDifference) {
  const n = nums.length;

  let minValue = Infinity;
  let maxValue = -Infinity;

  let minIndex = -1;
  let maxIndex = -1;

  for (let j = indexDifference; j < n; j++) {
    const i = j - indexDifference;

    if (nums[i] < minValue) {
      minValue = nums[i];
      minIndex = i;
    }

    if (nums[i] > maxValue) {
      maxValue = nums[i];
      maxIndex = i;
    }

    if (nums[j] - minValue >= valueDifference) {
      return [minIndex, j];
    }

    if (maxValue - nums[j] >= valueDifference) {
      return [maxIndex, j];
    }
  }

  return [-1, -1];
};
