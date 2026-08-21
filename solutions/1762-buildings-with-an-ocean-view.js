/**
 * Buildings With An Ocean View
 * Intuition: The ocean is on the right, so a building has a view iff it is strictly taller than every building to its right. A right-to-left scan with a running max finds those indices.
 * Approach: 1. Start at the last index with `currentMaxRightHeight = 0`. 2. If `buildingHeight > currentMaxRightHeight`, push the index and update the max. 3. Reverse `oceanViewIndices` to left-to-right order.
 * Dry Run: heights = [4,2,3,1].
 *   - i=3: 1>0 → [3], max=1. i=2: 3>1 → [3,2], max=3. i=1: 2 skipped. i=0: 4>3 → [3,2,0]. Reverse → [0,2,3].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var findBuildings = function (heights) {
  const oceanViewIndices = [];
  let currentMaxRightHeight = 0;
  let currentBuildingIndex = heights.length - 1;

  while (currentBuildingIndex >= 0) {
    const buildingHeight = heights[currentBuildingIndex];
    if (buildingHeight > currentMaxRightHeight) {
      oceanViewIndices.push(currentBuildingIndex);
      currentMaxRightHeight = buildingHeight;
    }
    currentBuildingIndex--;
  }

  return oceanViewIndices.reverse();
};
