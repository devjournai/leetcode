/**
 * Minimum Number Of K Consecutive Bit Flips
 * Intuition: A 0 (after prior flips) must start a length-k flip. `currentActiveFlips` and `flipEndPoints` expire flips at index i+k.
 * Approach: 1. At each i, drop ended flips. 2. `netValueAfterFlips = (nums[i] + currentActiveFlips) % 2`. 3. If 0, if i+k exceeds n return -1; else increment total/active and push i+k. 4. Return `totalFlipsNeeded`.
 * Dry Run: nums = [0,1,0], k=1. Flip at 0, skip 1, flip at 2. Answer 2.
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
