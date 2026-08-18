/**
 * Ant On The Boundary
 * Intuition: The ant's current position is the cumulative sum of all its movements from the starting point. To determine if the ant is on the boundary, we simply check if its current cumulative position is zero after each move.
 * Approach: 1. Initialize a variable, let's call it 'currentAntPosition', to track the ant's location, setting its initial value to zero (the boundary). 2. Initialize another variable, 'boundaryReturnsCounter', to count how many times the ant lands on the boundary, starting at zero. 3. Iterate through the input array 'nums' using a standard index-based loop. 4. In each iteration, retrieve the 'movementValue' from the current index of 'nums'. 5. Update 'currentAntPosition' by adding 'movementValue' to it. 6. After updating the position, check if 'currentAntPosition' is exactly zero. 7. If it is zero, increment 'boundaryReturnsCounter'. 8. After the loop completes, return the final value of 'boundaryReturnsCounter'.
 * Dry Run: nums = [2, 3, -5, 4, -4]
 *   - currentAntPosition = 0
 *   - boundaryReturnsCounter = 0
 *   - Loop 1 (index = 0):
 *     - movementValue = nums[0] = 2
 *     - currentAntPosition = 0 + 2 = 2
 *     - currentAntPosition (2) is not 0.
 *   - Loop 2 (index = 1):
 *     - movementValue = nums[1] = 3
 *     - currentAntPosition = 2 + 3 = 5
 *     - currentAntPosition (5) is not 0.
 *   - Loop 3 (index = 2):
 *     - movementValue = nums[2] = -5
 *     - currentAntPosition = 5 + (-5) = 0
 *     - currentAntPosition (0) is 0. Increment boundaryReturnsCounter to 1.
 *   - Loop 4 (index = 3):
 *     - movementValue = nums[3] = 4
 *     - currentAntPosition = 0 + 4 = 4
 *     - currentAntPosition (4) is not 0.
 *   - Loop 5 (index = 4):
 *     - movementValue = nums[4] = -4
 *     - currentAntPosition = 4 + (-4) = 0
 *     - currentAntPosition (0) is 0. Increment boundaryReturnsCounter to 2.
 *   - Loop ends. Return boundaryReturnsCounter (2).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var returnToBoundaryCount = function (nums) {
  let currentAntPosition = 0;
  let boundaryReturnsCounter = 0;

  for (let currentIndex = 0; currentIndex < nums.length; currentIndex++) {
    let movementValue = nums[currentIndex];
    currentAntPosition += movementValue;

    if (currentAntPosition === 0) {
      boundaryReturnsCounter++;
    }
  }

  return boundaryReturnsCounter;
};
