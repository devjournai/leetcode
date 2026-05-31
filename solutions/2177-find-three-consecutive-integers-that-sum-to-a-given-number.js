/**
 * Find Three Consecutive Integers That Sum To A Given Number
 * Intuition: The sum of three consecutive integers (x-1) + x + (x+1) simplifies to 3x. For this sum to equal num, num must be perfectly divisible by 3. If num is a multiple of 3, then x is simply num / 3.
 * Approach: 1. Check if the given number `num` is divisible by 3. 2. If it is not divisible by 3, return an empty array. 3. If it is divisible by 3, calculate the middle integer `num / 3`. 4. Construct an array with the middle integer minus one, the middle integer, and the middle integer plus one. 5. Return this array.
 * Dry Run: Input: num = 33.
 *   1. inputNumber = 33.
 *   2. remainderValue = inputNumber % 3 = 33 % 3 = 0.
 *   3. Since remainderValue is 0, proceed.
 *   4. middleValue = inputNumber / 3 = 33 / 3 = 11.
 *   5. lowerValue = middleValue - 1 = 11 - 1 = 10.
 *   6. upperValue = middleValue + 1 = 11 + 1 = 12.
 *   7. finalSequence = [lowerValue, middleValue, upperValue] = [10, 11, 12].
 *   8. Return [10, 11, 12].
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var sumOfThree = function (num) {
  const inputNumber = num;
  const remainderValue = inputNumber % 3;

  if (remainderValue !== 0) {
    return [];
  }

  const middleValue = inputNumber / 3;
  const lowerValue = middleValue - 1;
  const upperValue = middleValue + 1;
  const finalSequence = [lowerValue, middleValue, upperValue];

  return finalSequence;
};
