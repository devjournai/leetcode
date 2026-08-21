/**
 * Minimum Distance to the Target Element
 * Intuition: Scan every occurrence of `target` and keep the smallest |index − start|.
 * Approach: 1. Initialize `minOverallDistance` to Infinity. 2. Walk `arrayTraversalIndex` over `nums`. 3. When `nums[i] === target`, update with `Math.abs(i - start)`. 4. Return the minimum.
 * Dry Run: nums=[1,2,3,4,5], target=5, start=3.
 *   - Only index 4 equals 5 → |4-3|=1. Return 1.
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
        currentCalculatedDistance
      );
    }
    arrayTraversalIndex++;
  }

  return minOverallDistance;
};
