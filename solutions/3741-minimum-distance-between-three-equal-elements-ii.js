/**
 * Minimum Distance Between Three Equal Elements II
 * Intuition: Same triple-distance 2*(third-first) over consecutive occurrences, using a Map because values may be sparse.
 * Approach: 1. Map each value to its index list. 2. Skip lists shorter than 3. 3. For each window of three consecutive indices, minimize 2*(third-first). 4. Return min or -1.
 * Dry Run: nums = [5, 5, 7, 5]. Indices of 5: 0,1,3 → 2*(3-0)=6.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumDistance = function (nums) {
  const valueMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (!valueMap.has(num)) {
      valueMap.set(num, []);
    }
    valueMap.get(num).push(i);
  }

  let minTotalDistance = Number.POSITIVE_INFINITY;

  for (const indicesList of valueMap.values()) {
    if (indicesList.length < 3) {
      continue;
    }
    for (let i = 0; i < indicesList.length - 2; i++) {
      const firstIdx = indicesList[i];
      const thirdIdx = indicesList[i + 2];

      const currentDistance = 2 * (thirdIdx - firstIdx);
      minTotalDistance = Math.min(minTotalDistance, currentDistance);
    }
  }

  return minTotalDistance === Number.POSITIVE_INFINITY ? -1 : minTotalDistance;
};
