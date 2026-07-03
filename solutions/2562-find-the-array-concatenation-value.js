/**
 * Find The Array Concatenation Value
 * Intuition: The problem requires processing elements from both ends of the array inwards. We can iterate through pairs of elements from the start and end, handling a potential middle element separately if the array length is odd.
 * Approach: 1. Initialize a variable to accumulate the concatenation value. 2. Use two pointers, one starting at the beginning and one at the end of the array. 3. Determine the number of pairs to process. 4. Iterate a fixed number of times (half the array length), concatenating the numbers at the pointers, adding to the total, and moving the pointers inwards. 5. After the loop, check if there's a single remaining element (for odd-length arrays) and add its value to the total.
 * Dry Run:
 *   nums = [1, 2, 4, 5, 6]
 *   totalConcatenationValue = 0
 *   leftPointer = 0
 *   rightPointer = 4
 *   currentArrayLength = 5
 *   pairCount = Math.floor(5 / 2) = 2
 *
 *   Loop (loopCounter from 0 to 1):
 *   - loopCounter = 0:
 *     - firstValue = nums[0] = 1
 *     - secondValue = nums[4] = 6
 *     - combinedString = "1" + "6" = "16"
 *     - totalConcatenationValue = 0 + Number("16") = 16
 *     - leftPointer = 1
 *     - rightPointer = 3
 *   - loopCounter = 1:
 *     - firstValue = nums[1] = 2
 *     - secondValue = nums[3] = 5
 *     - combinedString = "2" + "5" = "25"
 *     - totalConcatenationValue = 16 + Number("25") = 41
 *     - leftPointer = 2
 *     - rightPointer = 2
 *
 *   Loop ends.
 *
 *   Check for middle element:
 *   - currentArrayLength % 2 === 1 (5 % 2 === 1) is true.
 *   - totalConcatenationValue = 41 + nums[leftPointer] (nums[2]) = 41 + 4 = 45
 *
 *   Return 45.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findTheArrayConcVal = function (nums) {
  let totalConcatenationValue = 0;
  let leftPointer = 0;
  let rightPointer = nums.length - 1;
  let currentArrayLength = nums.length;

  let pairCount = Math.floor(currentArrayLength / 2);

  for (let loopCounter = 0; loopCounter < pairCount; loopCounter++) {
    let firstValue = nums[leftPointer];
    let secondValue = nums[rightPointer];
    let combinedString = String(firstValue) + String(secondValue);
    totalConcatenationValue += Number(combinedString);

    leftPointer++;
    rightPointer--;
  }

  if (currentArrayLength % 2 === 1) {
    totalConcatenationValue += nums[leftPointer];
  }

  return totalConcatenationValue;
};
