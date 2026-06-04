/**
 * Find Triangular Sum Of An Array
 * Intuition: The problem describes an iterative reduction process where an array of digits is continuously transformed into a new, shorter array by summing adjacent elements and taking their modulo 10. This continues until only a single digit remains, which is the triangular sum. The core idea is to simulate this process by repeatedly generating the next level of the array until a single element is achieved.
 * Approach: 1. Initialize a mutable variable, `nums`, which will represent the current level of the array throughout the process. 2. Establish an outer loop that controls the reduction steps. This loop should continue as long as the current array `nums` contains more than one element. A `for` loop decrementing a counter from the initial array length down to 2 can effectively manage this. 3. Inside the outer loop, declare a new array, `nextLevelValues`, to store the elements of the array for the subsequent step. 4. Implement an inner loop that iterates through the `nums` array from its first element up to its second-to-last element. This loop computes the new elements. 5. In each iteration of the inner loop, calculate the sum of the current element (`nums[elementIndexPosition]`) and its right neighbor (`nums[elementIndexPosition + 1]`). Then, compute the modulo 10 of this sum. 6. Add the resulting modulo value to the `nextLevelValues` array. 7. After the inner loop completes, assign `nums` to `nextLevelValues`, effectively replacing the current array with the newly generated one for the next reduction step. 8. Once the outer loop terminates, `nums` will contain exactly one element. Return this element.
 * Dry Run: nums = [1,2,3,4,5]
 *   Initial state: nums = [1,2,3,4,5]
 *   Outer loop (currentArraySize = 5):
 *     nextLevelValues = []
 *     Inner loop (elementIndexPosition from 0 to 3):
 *       elementIndexPosition = 0: (nums[0] + nums[1]) % 10 = (1 + 2) % 10 = 3. nextLevelValues = [3]
 *       elementIndexPosition = 1: (nums[1] + nums[2]) % 10 = (2 + 3) % 10 = 5. nextLevelValues = [3,5]
 *       elementIndexPosition = 2: (nums[2] + nums[3]) % 10 = (3 + 4) % 10 = 7. nextLevelValues = [3,5,7]
 *       elementIndexPosition = 3: (nums[3] + nums[4]) % 10 = (4 + 5) % 10 = 9. nextLevelValues = [3,5,7,9]
 *     nums is updated to [3,5,7,9]
 *   Outer loop (currentArraySize = 4):
 *     nextLevelValues = []
 *     Inner loop (elementIndexPosition from 0 to 2):
 *       elementIndexPosition = 0: (nums[0] + nums[1]) % 10 = (3 + 5) % 10 = 8. nextLevelValues = [8]
 *       elementIndexPosition = 1: (nums[1] + nums[2]) % 10 = (5 + 7) % 10 = 12 % 10 = 2. nextLevelValues = [8,2]
 *       elementIndexPosition = 2: (nums[2] + nums[3]) % 10 = (7 + 9) % 10 = 16 % 10 = 6. nextLevelValues = [8,2,6]
 *     nums is updated to [8,2,6]
 *   Outer loop (currentArraySize = 3):
 *     nextLevelValues = []
 *     Inner loop (elementIndexPosition from 0 to 1):
 *       elementIndexPosition = 0: (nums[0] + nums[1]) % 10 = (8 + 2) % 10 = 10 % 10 = 0. nextLevelValues = [0]
 *       elementIndexPosition = 1: (nums[1] + nums[2]) % 10 = (2 + 6) % 10 = 8. nextLevelValues = [0,8]
 *     nums is updated to [0,8]
 *   Outer loop (currentArraySize = 2):
 *     nextLevelValues = []
 *     Inner loop (elementIndexPosition from 0 to 0):
 *       elementIndexPosition = 0: (nums[0] + nums[1]) % 10 = (0 + 8) % 10 = 8. nextLevelValues = [8]
 *     nums is updated to [8]
 *   Outer loop (currentArraySize = 1): Loop condition `currentArraySize > 1` (1 > 1) is false. Loop terminates.
 *   Return nums[0] which is 8.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var triangularSum = function (nums) {
  for (
    let currentArraySize = nums.length;
    currentArraySize > 1;
    currentArraySize--
  ) {
    let nextLevelValues = [];

    for (
      let elementIndexPosition = 0;
      elementIndexPosition < currentArraySize - 1;
      elementIndexPosition++
    ) {
      let sumAdjacent =
        nums[elementIndexPosition] + nums[elementIndexPosition + 1];
      let moduloResult = sumAdjacent % 10;
      nextLevelValues.push(moduloResult);
    }
    nums = nextLevelValues;
  }

  return nums[0];
};
