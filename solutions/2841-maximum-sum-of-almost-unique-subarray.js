/**
 * Maximum Sum Of Almost Unique Subarray
 * Intuition: The problem requires finding the maximum sum of a fixed-length subarray that satisfies a minimum distinct element count. This naturally points to a sliding window approach, where we efficiently update the sum and distinct element count as the window moves across the array.
 * Approach: 1. Initialize a frequency map (valueCountsMap), a current sum for the window (currentWindowSum), and a variable to track the maximum sum found (maximumSubarraySum). 2. Construct the initial window of size `k` by iterating from index `0` to `k-1`, adding elements to the valueCountsMap and currentWindowSum. 3. After the initial window, check if the number of distinct elements (valueCountsMap.size) is at least `m`. If so, update maximumSubarraySum. 4. Slide the window using two pointers, `leftWindowPointer` and `rightWindowPointer`. In each step, remove the element at `leftWindowPointer` from the window (update map and sum), add the element at `rightWindowPointer` to the window (update map and sum), and then check the distinct count. If the distinct count is sufficient, update maximumSubarraySum with the currentWindowSum if it's greater. 5. Increment both pointers for the next slide. 6. Return the final maximumSubarraySum.
 * Dry Run: nums = [1,1,2,3,4], m = 2, k = 3
 *   1. Initialize: valueCountsMap = {}, currentWindowSum = 0, maximumSubarraySum = 0.
 *   2. Initial Window (i=0 to 2):
 *      - initialWindowIdx = 0: nums[0]=1. valueCountsMap = {1:1}, currentWindowSum = 1.
 *      - initialWindowIdx = 1: nums[1]=1. valueCountsMap = {1:2}, currentWindowSum = 2.
 *      - initialWindowIdx = 2: nums[2]=2. valueCountsMap = {1:2, 2:1}, currentWindowSum = 4.
 *      - Initial window: [1,1,2]. distinct count = 2. Since 2 >= m (2), maximumSubarraySum = 4.
 *   3. Sliding Window (leftWindowPointer=0, rightWindowPointer=3):
 *      - rightWindowPointer = 3 (nums[3]=3):
 *        - Remove nums[leftWindowPointer=0]=1: valueCountsMap.set(1, 1). currentWindowSum = 4-1 = 3.
 *        - Add nums[rightWindowPointer=3]=3: valueCountsMap.set(3, 1). currentWindowMap = {1:1, 2:1, 3:1}. currentWindowSum = 3+3 = 6.
 *        - Distinct count = 3. Since 3 >= m (2), maximumSubarraySum = Math.max(4, 6) = 6.
 *        - leftWindowPointer becomes 1, rightWindowPointer becomes 4.
 *      - rightWindowPointer = 4 (nums[4]=4):
 *        - Remove nums[leftWindowPointer=1]=1: valueCountsMap.set(1, 0), then valueCountsMap.delete(1). currentWindowMap = {2:1, 3:1}. currentWindowSum = 6-1 = 5.
 *        - Add nums[rightWindowPointer=4]=4: valueCountsMap.set(4, 1). currentWindowMap = {2:1, 3:1, 4:1}. currentWindowSum = 5+4 = 9.
 *        - Distinct count = 3. Since 3 >= m (2), maximumSubarraySum = Math.max(6, 9) = 9.
 *        - leftWindowPointer becomes 2, rightWindowPointer becomes 5.
 *   4. Loop ends as rightWindowPointer (5) is not less than nums.length (5).
 *   5. Return maximumSubarraySum = 9.
 * Time Complexity: O(N)
 * Space Complexity: O(k)
 */
var maxSum = function (nums, m, k) {
  const valueCountsMap = new Map();
  let currentWindowSum = 0;
  let maximumSubarraySum = 0;

  for (let initialWindowIdx = 0; initialWindowIdx < k; initialWindowIdx++) {
    const currentNumber = nums[initialWindowIdx];
    valueCountsMap.set(
      currentNumber,
      (valueCountsMap.get(currentNumber) || 0) + 1
    );
    currentWindowSum += currentNumber;
  }

  if (valueCountsMap.size >= m) {
    maximumSubarraySum = currentWindowSum;
  }

  let leftWindowPointer = 0;
  let rightWindowPointer = k;

  while (rightWindowPointer < nums.length) {
    const elementToDrop = nums[leftWindowPointer];
    const removedElementCount = valueCountsMap.get(elementToDrop) - 1;
    valueCountsMap.set(elementToDrop, removedElementCount);
    if (removedElementCount === 0) {
      valueCountsMap.delete(elementToDrop);
    }
    currentWindowSum -= elementToDrop;

    const elementToAdd = nums[rightWindowPointer];
    const addedElementCount = (valueCountsMap.get(elementToAdd) || 0) + 1;
    valueCountsMap.set(elementToAdd, addedElementCount);
    currentWindowSum += elementToAdd;

    if (valueCountsMap.size >= m) {
      maximumSubarraySum = Math.max(maximumSubarraySum, currentWindowSum);
    }

    leftWindowPointer++;
    rightWindowPointer++;
  }

  return maximumSubarraySum;
};
