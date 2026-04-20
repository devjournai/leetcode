/**
 * Minimum Number Of K Consecutive Bit Flips
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var minKBitFlips = function (nums, k) {
  const flipEndPoints = [];
  let currentActiveFlips = 0;
  let totalFlipsNeeded = 0;
  let arrayTraversalIndex = 0;

  while (arrayTraversalIndex < nums.length) {
    if (flipEndPoints.length > 0 && flipEndPoints[0] === arrayTraversalIndex) {
      flipEndPoints.shift();
      currentActiveFlips--;
    }

    const currentValue = nums[arrayTraversalIndex];
    const netValueAfterFlips = (currentValue + currentActiveFlips) % 2;

    if (netValueAfterFlips === 0) {
      if (arrayTraversalIndex + k > nums.length) {
        return -1;
      }
      totalFlipsNeeded++;
      currentActiveFlips++;
      flipEndPoints.push(arrayTraversalIndex + k);
    }
    arrayTraversalIndex++;
  }

  return totalFlipsNeeded;
};
