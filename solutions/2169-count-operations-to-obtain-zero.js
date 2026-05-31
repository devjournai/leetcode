/**
 * Count Operations To Obtain Zero
 * Intuition: The problem describes a process analogous to the Euclidean algorithm for finding the greatest common divisor (GCD). Each operation reduces the larger of the two numbers by the smaller one. This iterative subtraction continues until one of the numbers becomes zero, at which point no further subtractions are possible. The objective is to count the total number of such reduction steps performed before termination.
 * Approach: 1. Initialize a counter variable, `totalOperations`, to zero to keep track of the operations. 2. Create local mutable copies of the input numbers, `firstValue` from `num1` and `secondValue` from `num2`, as they will be modified. 3. Enter a loop that continues as long as both `firstValue` and `secondValue` are strictly greater than zero. 4. Inside this loop, compare `firstValue` and `secondValue`. 5. If `firstValue` is greater than or equal to `secondValue`, subtract `secondValue` from `firstValue` and update `firstValue` with the result. 6. Otherwise (if `secondValue` is greater than `firstValue`), subtract `firstValue` from `secondValue` and update `secondValue` with the result. 7. After each subtraction, increment the `totalOperations` counter by one. 8. The loop terminates when either `firstValue` or `secondValue` becomes zero. 9. Finally, return the accumulated `totalOperations` count.
 * Dry Run: num1 = 5, num2 = 4
 * Initial State: firstValue = 5, secondValue = 4, totalOperations = 0
 * Loop Iteration 1:
 *   Condition (5 != 0 && 4 != 0) is true.
 *   (firstValue=5 >= secondValue=4) is true.
 *   firstValue = 5 - 4 = 1.
 *   totalOperations = 1.
 *   Current State: firstValue = 1, secondValue = 4, totalOperations = 1
 * Loop Iteration 2:
 *   Condition (1 != 0 && 4 != 0) is true.
 *   (firstValue=1 >= secondValue=4) is false.
 *   secondValue = 4 - 1 = 3.
 *   totalOperations = 2.
 *   Current State: firstValue = 1, secondValue = 3, totalOperations = 2
 * Loop Iteration 3:
 *   Condition (1 != 0 && 3 != 0) is true.
 *   (firstValue=1 >= secondValue=3) is false.
 *   secondValue = 3 - 1 = 2.
 *   totalOperations = 3.
 *   Current State: firstValue = 1, secondValue = 2, totalOperations = 3
 * Loop Iteration 4:
 *   Condition (1 != 0 && 2 != 0) is true.
 *   (firstValue=1 >= secondValue=2) is false.
 *   secondValue = 2 - 1 = 1.
 *   totalOperations = 4.
 *   Current State: firstValue = 1, secondValue = 1, totalOperations = 4
 * Loop Iteration 5:
 *   Condition (1 != 0 && 1 != 0) is true.
 *   (firstValue=1 >= secondValue=1) is true.
 *   firstValue = 1 - 1 = 0.
 *   totalOperations = 5.
 *   Current State: firstValue = 0, secondValue = 1, totalOperations = 5
 * Loop Termination:
 *   Condition (0 != 0 && 1 != 0) is false because firstValue is 0.
 * Return: totalOperations (which is 5).
 * Time Complexity: O(max(num1, num2))
 * Space Complexity: O(1)
 */
var countOperations = function (num1, num2) {
  let totalOperations = 0;
  let firstValue = num1;
  let secondValue = num2;

  while (firstValue !== 0 && secondValue !== 0) {
    if (firstValue >= secondValue) {
      firstValue -= secondValue;
    } else {
      secondValue -= firstValue;
    }
    totalOperations++;
  }

  return totalOperations;
};
