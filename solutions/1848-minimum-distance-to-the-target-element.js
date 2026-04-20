/**
 * Minimum Distance to the Target Element
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var getMinDistance = function (nums, target, start) {
  let minOverallDistance = Infinity;
  let arrayTraversalIndex = 0;
  const totalElements = nums.length;

  while (arrayTraversalIndex < totalElements) {
    if (nums[arrayTraversalIndex] === target) {
      const currentCalculatedDistance = Math.abs(arrayTraversalIndex - start);
      minOverallDistance = Math.min(
        minOverallDistance,
        currentCalculatedDistance,
      );
    }
    arrayTraversalIndex++;
  }

  return minOverallDistance;
};
