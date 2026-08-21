/**
 * Find Indices With Index and Value Difference II
 * Intuition: While scanning j, every i = j - indexDifference is already far enough. Only the running min and max among those i can satisfy the value gap.
 * Approach: 1. For j from indexDifference to n-1, fold i=j-indexDifference into minValue/minIndex and maxValue/maxIndex. 2. If nums[j]-minValue or maxValue-nums[j] is at least valueDifference, return that pair. 3. Else [-1,-1].
 * Dry Run: nums=[5,1,4,1], indexDifference=2, valueDifference=4. j=2, i=0 min=5. j=3, i=1 min=1; 1 and nums[3]=1 fail, but max=5 at 0 and 5-1>=4 returns [0,3].
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
