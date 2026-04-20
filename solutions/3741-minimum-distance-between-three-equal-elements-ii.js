/**
 * Minimum Distance Between Three Equal Elements II
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
