/**
 * Rearrange Array Elements By Sign
 * Intuition: The problem requires arranging positive numbers at even indices and negative numbers at odd indices, starting with a positive number, while preserving their original relative order. We can achieve this by using two separate pointers to track the next available even and odd positions in the result array, placing elements from the input array directly into their designated slots.
 * Approach: 1. Initialize a new array `finalArrangement` of the same length as `nums` to store the rearranged elements. 2. Set `positivePlacementIndex` to 0 (for the first positive number's slot). 3. Set `negativePlacementIndex` to 1 (for the first negative number's slot). 4. Iterate through the input `nums` array using an `originalElementsIterator`. 5. If the current number `currentValue` from `nums` is positive, place it into `finalArrangement[positivePlacementIndex]` and increment `positivePlacementIndex` by 2. 6. If `currentValue` is negative, place it into `finalArrangement[negativePlacementIndex]` and increment `negativePlacementIndex` by 2. 7. After iterating through all elements, return `finalArrangement`.
 * Dry Run: nums = [3,1,-2,-5,2,-4]
 * 1. `finalArrangement = [ , , , , , ]` (length 6)
 * 2. `positivePlacementIndex = 0`
 * 3. `negativePlacementIndex = 1`
 * 4. `originalElementsIterator` starts at 0:
 *    - `originalElementsIterator = 0`, `currentValue = nums[0] = 3`. `3 > 0`: `finalArrangement[0] = 3`. `positivePlacementIndex` becomes 2. `finalArrangement = [3, , , , , ]`
 *    - `originalElementsIterator = 1`, `currentValue = nums[1] = 1`. `1 > 0`: `finalArrangement[2] = 1`. `positivePlacementIndex` becomes 4. `finalArrangement = [3, , 1, , , ]`
 *    - `originalElementsIterator = 2`, `currentValue = nums[2] = -2`. `-2 < 0`: `finalArrangement[1] = -2`. `negativePlacementIndex` becomes 3. `finalArrangement = [3, -2, 1, , , ]`
 *    - `originalElementsIterator = 3`, `currentValue = nums[3] = -5`. `-5 < 0`: `finalArrangement[3] = -5`. `negativePlacementIndex` becomes 5. `finalArrangement = [3, -2, 1, -5, , ]`
 *    - `originalElementsIterator = 4`, `currentValue = nums[4] = 2`. `2 > 0`: `finalArrangement[4] = 2`. `positivePlacementIndex` becomes 6. `finalArrangement = [3, -2, 1, -5, 2, ]`
 *    - `originalElementsIterator = 5`, `currentValue = nums[5] = -4`. `-4 < 0`: `finalArrangement[5] = -4`. `negativePlacementIndex` becomes 7. `finalArrangement = [3, -2, 1, -5, 2, -4]`
 * 5. Loop finishes.
 * 6. Return `[3, -2, 1, -5, 2, -4]`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var rearrangeArray = function (nums) {
  const finalArrangement = new Array(nums.length);
  let positivePlacementIndex = 0;
  let negativePlacementIndex = 1;

  for (
    let originalElementsIterator = 0;
    originalElementsIterator < nums.length;
    originalElementsIterator++
  ) {
    const currentValue = nums[originalElementsIterator];
    if (currentValue > 0) {
      finalArrangement[positivePlacementIndex] = currentValue;
      positivePlacementIndex += 2;
    } else {
      finalArrangement[negativePlacementIndex] = currentValue;
      negativePlacementIndex += 2;
    }
  }

  return finalArrangement;
};
