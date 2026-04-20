/**
 * Array Nesting
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var arrayNesting = function (nums) {
  const totalElements = nums.length;
  const visitedStatus = new Array(totalElements).fill(false);
  let longestPathFound = 0;

  for (let initialIndex = 0; initialIndex < totalElements; initialIndex++) {
    if (visitedStatus[initialIndex]) {
      continue;
    }

    let currentPathLength = 0;
    let traversalIndex = initialIndex;

    while (!visitedStatus[traversalIndex]) {
      visitedStatus[traversalIndex] = true;
      currentPathLength++;
      traversalIndex = nums[traversalIndex];
    }
    longestPathFound = Math.max(longestPathFound, currentPathLength);
  }

  return longestPathFound;
};
