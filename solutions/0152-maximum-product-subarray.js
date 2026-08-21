/**
 * Maximum Product Subarray
 * Intuition: A negative number swaps the roles of max and min products. Tracking both the best and worst product ending at the current index lets a later negative restore a large positive.
 * Approach: 1. If empty, return 0. 2. Initialize `globalMaximum`, `currentMaximumEndingHere`, and `currentMinimumEndingHere` to `nums[0]`. 3. For each later `currentElement`, snapshot previous max/min, then set max to `Math.max(element, prevMax*el, prevMin*el)` and min analogously with `Math.min`. 4. Update `globalMaximum` with the new max. 5. Return `globalMaximum`.
 * Dry Run: nums = [2,3,-2,4]
 * After 2: max=2, min=2
 * After 3: max=6, min=3, global=6
 * After -2: max=-2, min=-12, global=6
 * After 4: max=4, min=-48, global=6
 * Result: 6
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxProduct = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let globalMaximum = nums[0];
  let currentMaximumEndingHere = nums[0];
  let currentMinimumEndingHere = nums[0];

  for (let loopIndex = 1; loopIndex < nums.length; loopIndex++) {
    let currentElement = nums[loopIndex];
    let previousMaximumValue = currentMaximumEndingHere;
    let previousMinimumValue = currentMinimumEndingHere;

    currentMaximumEndingHere = Math.max(
      currentElement,
      previousMaximumValue * currentElement,
      previousMinimumValue * currentElement
    );

    currentMinimumEndingHere = Math.min(
      currentElement,
      previousMaximumValue * currentElement,
      previousMinimumValue * currentElement
    );

    globalMaximum = Math.max(globalMaximum, currentMaximumEndingHere);
  }

  return globalMaximum;
};
