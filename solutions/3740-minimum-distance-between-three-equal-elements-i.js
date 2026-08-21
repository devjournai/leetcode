/**
 * Minimum Distance Between Three Equal Elements I
 * Intuition: Distance of a triple (i, j, k) with equal values is 2*(k-i). Consecutive occurrences of the same value give the tightest window of three.
 * Approach: 1. Bucket indices by value. 2. For each value, slide windows of three consecutive indices and take 2*(last-first). 3. Return the min or -1.
 * Dry Run: nums = [1, 2, 1, 1]. Value 1 at 0,2,3 → 2*(3-0)=6.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumDistance = function (nums) {
  const indicesMap = Array.from({ length: nums.length + 1 }, () => []);

  for (let i = 0; i < nums.length; i++) {
    indicesMap[nums[i]].push(i);
  }

  let minOverallDistance = Number.MAX_SAFE_INTEGER;

  for (let value = 1; value < indicesMap.length; value++) {
    const indicesList = indicesMap[value];

    for (let p = 0; p <= indicesList.length - 3; p++) {
      const firstIdx = indicesList[p];
      const lastIdx = indicesList[p + 2];

      const currentDistance = 2 * (lastIdx - firstIdx);

      minOverallDistance = Math.min(minOverallDistance, currentDistance);
    }
  }

  if (minOverallDistance === Number.MAX_SAFE_INTEGER) {
    return -1;
  } else {
    return minOverallDistance;
  }
};
