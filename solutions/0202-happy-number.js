/**
 * Happy Number
 * Intuition: Repeatedly replacing a number with the sum of squares of its digits either reaches 1 (happy) or enters a cycle. Floyd's tortoise-and-hare detects that cycle in constant extra space.
 * Approach: 1. Slow starts at n; fast starts at sum-of-squares(n). 2. Until fast is 1 or the pointers meet, move slow one sum-of-squares step and fast two. 3. Return whether fast landed on 1.
 * Dry Run: n = 19.
 *   - slow=19, fast=82.
 *   - Loop: slow=82, fast=calc(calc(82))=calc(68)=100.
 *   - Loop: slow=68, fast=calc(calc(100))=calc(1)=1.
 *   - fast === 1 → true.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var isHappy = function (n) {
  let firstPointer = n;
  let secondPointer = calculateSumOfSquares(n);

  while (secondPointer !== 1 && firstPointer !== secondPointer) {
    firstPointer = calculateSumOfSquares(firstPointer);
    secondPointer = calculateSumOfSquares(calculateSumOfSquares(secondPointer));
  }

  return secondPointer === 1;
};

const calculateSumOfSquares = (currentNumber) => {
  let sumResult = 0;
  let temporaryNumber = currentNumber;
  while (temporaryNumber > 0) {
    let digitExtracted = temporaryNumber % 10;
    sumResult += digitExtracted * digitExtracted;
    temporaryNumber = Math.floor(temporaryNumber / 10);
  }
  return sumResult;
};
