/**
 * Maximum Product of Two Elements in an Array
 * Intuition: To maximize the product (num1 - 1) * (num2 - 1), we need to select the two largest numbers from the given array.
 * Approach: 1. Initialize two variables, `largestElementValue` and `secondLargestElementValue`, to track the two biggest numbers found so far, setting them initially to 0 (since all numbers in `nums` are guaranteed to be at least 1). 2. Iterate through each `currentNumberValue` in the input array `nums`. 3. If `currentNumberValue` is greater than `largestElementValue`, it means we found a new largest number. In this case, update `secondLargestElementValue` with the old `largestElementValue`, and then update `largestElementValue` with `currentNumberValue`. 4. Else if `currentNumberValue` is not greater than `largestElementValue` but is greater than `secondLargestElementValue`, update `secondLargestElementValue` with `currentNumberValue`. 5. After iterating through all numbers, calculate the final product using `(largestElementValue - 1) * (secondLargestElementValue - 1)`.
 * Dry Run: nums = [3,4,5,2]
 *   Initial: largestElementValue = 0, secondLargestElementValue = 0
 *   1. currentNumberValue = 3: 3 > largestElementValue (0). Update secondLargestElementValue = 0, largestElementValue = 3. State: largestElementValue = 3, secondLargestElementValue = 0.
 *   2. currentNumberValue = 4: 4 > largestElementValue (3). Update secondLargestElementValue = 3, largestElementValue = 4. State: largestElementValue = 4, secondLargestElementValue = 3.
 *   3. currentNumberValue = 5: 5 > largestElementValue (4). Update secondLargestElementValue = 4, largestElementValue = 5. State: largestElementValue = 5, secondLargestElementValue = 4.
 *   4. currentNumberValue = 2: 2 is not > largestElementValue (5). 2 is not > secondLargestElementValue (4). State remains: largestElementValue = 5, secondLargestElementValue = 4.
 *   End of loop.
 *   Calculate final result: (largestElementValue - 1) * (secondLargestElementValue - 1) = (5 - 1) * (4 - 1) = 4 * 3 = 12.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxProduct = function (nums) {
  let largestElementValue = 0;
  let secondLargestElementValue = 0;

  let totalElements = nums.length;

  for (
    let currentIterationIndex = 0;
    currentIterationIndex < totalElements;
    currentIterationIndex++
  ) {
    let currentNumberValue = nums[currentIterationIndex];

    if (currentNumberValue > largestElementValue) {
      secondLargestElementValue = largestElementValue;
      largestElementValue = currentNumberValue;
    } else if (currentNumberValue > secondLargestElementValue) {
      secondLargestElementValue = currentNumberValue;
    }
  }

  let finalCalculatedProduct =
    (largestElementValue - 1) * (secondLargestElementValue - 1);
  return finalCalculatedProduct;
};
