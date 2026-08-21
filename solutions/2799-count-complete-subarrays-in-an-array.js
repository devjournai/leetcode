/**
 * Count Complete Subarrays In An Array
 * Intuition: Use a sliding window approach. First, determine the total number of distinct elements in the entire array. Then, expand the window from the right, keeping track of element frequencies. Once the window contains all distinct elements, shrink it from the left. For each valid window [left, right], all subarrays [left, k] where k >= right are also complete, so add (nums.length - right) to the total count.
 * Approach: 1. Calculate the total number of distinct elements in the input array `nums` and store this target count. 2. Initialize a frequency map for the current sliding window, a left pointer to 0, and a counter for complete subarrays to 0. 3. Iterate with a right pointer from the beginning to the end of `nums`. 4. For each element at the right pointer, add it to the window's frequency map. 5. While the number of distinct elements in the current window (based on the frequency map's size) equals the target total distinct count: a. Add `(nums.length - rightPointer)` to the complete subarray counter. b. Decrement the frequency of the element at the left pointer in the map. c. If its frequency becomes 0, remove it from the map. d. Increment the left pointer. 6. After the loop, return the total complete subarray counter.
 * Dry Run: nums = [1,3,1,2,3]
 *   1. distinctElementsSet = {1,3,2}, totalDistinctCount = 3
 *   2. currentWindowFrequencies = {}, leftPointer = 0, completeSubarrayAccumulator = 0
 *   3. rightPointer = 0, nums[0] = 1:
 *      - currentWindowFrequencies = {1:1}. currentWindowFrequencies.size = 1. Not 3.
 *   4. rightPointer = 1, nums[1] = 3:
 *      - currentWindowFrequencies = {1:1, 3:1}. currentWindowFrequencies.size = 2. Not 3.
 *   5. rightPointer = 2, nums[2] = 1:
 *      - currentWindowFrequencies = {1:2, 3:1}. currentWindowFrequencies.size = 2. Not 3.
 *   6. rightPointer = 3, nums[3] = 2:
 *      - currentWindowFrequencies = {1:2, 3:1, 2:1}. currentWindowFrequencies.size = 3. Equals totalDistinctCount.
 *      - WHILE loop starts:
 *          - completeSubarrayAccumulator += (5 - 3) = 2. completeSubarrayAccumulator = 2.
 *          - elementAtLeft = nums[0] = 1. currentWindowFrequencies.set(1, 1).
 *          - leftPointer = 1.
 *          - currentWindowFrequencies.size = 3. Still equals totalDistinctCount.
 *          - completeSubarrayAccumulator += (5 - 3) = 2. completeSubarrayAccumulator = 4.
 *          - elementAtLeft = nums[1] = 3. currentWindowFrequencies.set(3, 0). currentWindowFrequencies.delete(3).
 *          - leftPointer = 2.
 *          - currentWindowFrequencies = {1:1, 2:1}. currentWindowFrequencies.size = 2. Not 3. WHILE loop ends.
 *   7. rightPointer = 4, nums[4] = 3:
 *      - currentWindowFrequencies = {1:1, 2:1, 3:1}. currentWindowFrequencies.size = 3. Equals totalDistinctCount.
 *      - WHILE loop starts:
 *          - completeSubarrayAccumulator += (5 - 4) = 1. completeSubarrayAccumulator = 5.
 *          - elementAtLeft = nums[2] = 1. currentWindowFrequencies.set(1, 0). currentWindowFrequencies.delete(1).
 *          - leftPointer = 3.
 *          - currentWindowFrequencies = {2:1, 3:1}. currentWindowFrequencies.size = 2. Not 3. WHILE loop ends.
 *   8. End of loop. Return completeSubarrayAccumulator = 5.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var countCompleteSubarrays = function (nums) {
  const distinctElementsSet = new Set(nums);
  const totalDistinctCount = distinctElementsSet.size;

  const currentWindowFrequencies = new Map();
  let completeSubarrayAccumulator = 0;
  let leftPointer = 0;

  for (let rightPointer = 0; rightPointer < nums.length; rightPointer++) {
    const currentRightElement = nums[rightPointer];
    currentWindowFrequencies.set(
      currentRightElement,
      (currentWindowFrequencies.get(currentRightElement) || 0) + 1
    );

    while (currentWindowFrequencies.size === totalDistinctCount) {
      completeSubarrayAccumulator += nums.length - rightPointer;

      const elementAtLeft = nums[leftPointer];
      const currentFrequency = currentWindowFrequencies.get(elementAtLeft) - 1;
      currentWindowFrequencies.set(elementAtLeft, currentFrequency);

      if (currentFrequency === 0) {
        currentWindowFrequencies.delete(elementAtLeft);
      }
      leftPointer++;
    }
  }

  return completeSubarrayAccumulator;
};
