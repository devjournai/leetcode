/**
 * Buildings With An Ocean View
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
