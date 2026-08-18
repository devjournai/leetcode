/**
 * Minimum Operations To Exceed Threshold Value I
 * Intuition: To ensure all remaining elements are greater than or equal to a threshold `k`, we must remove every element that is currently less than `k`. Each such removal constitutes one operation. Therefore, the minimum number of operations is simply the count of elements in the initial array that do not meet the threshold.
 * Approach: 1. Initialize a counter to track the number of required operations. 2. Iterate through each element in the input array. 3. For each element, check if it is less than the given threshold `k`. 4. If an element is less than `k`, increment the operations counter. 5. After checking all elements, the final count represents the minimum operations needed.
 * Dry Run: nums = [10, 1, 5, 20], k = 10
 *   1. `requiredOperations` is initialized to `0`.
 *   2. Iterate `currentValue` in `nums`:
 *      - `currentValue = 10`: Is `10 < 10`? No. `requiredOperations` remains `0`.
 *      - `currentValue = 1`: Is `1 < 10`? Yes. `requiredOperations` becomes `1`.
 *      - `currentValue = 5`: Is `5 < 10`? Yes. `requiredOperations` becomes `2`.
 *      - `currentValue = 20`: Is `20 < 10`? No. `requiredOperations` remains `2`.
 *   3. Loop finishes.
 *   4. Return `requiredOperations`, which is `2`.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (nums, k) {
  let requiredOperations = 0;

  for (const currentValue of nums) {
    if (currentValue < k) {
      requiredOperations++;
    }
  }

  return requiredOperations;
};
