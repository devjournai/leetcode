/**
 * Replace Non Coprime Numbers In Array
 * Intuition: The problem describes a process of repeatedly merging adjacent non-coprime numbers. The "any arbitrary order" clause suggests that a stack-based approach, processing numbers sequentially and merging with the top of the stack, will yield the correct final state. When two numbers merge into their LCM, this LCM becomes the new candidate for further merges with preceding numbers on the stack, necessitating an inner loop.
 * Approach: 1. Implement a helper function `findGreatestCommonDivisor` using the Euclidean algorithm to determine if two numbers are coprime. 2. Initialize an empty array, `stackForResults`, to act as a stack. 3. Iterate through each `processingNumber` in the input `nums` array. 4. Assign `processingNumber` to a mutable `currentNumber`. 5. In an inner `while` loop, as long as `stackForResults` is not empty, check the `topElement` of the stack and `currentNumber`. 6. If `findGreatestCommonDivisor(topElement, currentNumber)` is greater than 1 (non-coprime): a. Pop `topElement` from `stackForResults`. b. Calculate their LCM: `currentNumber = (topElement / findGreatestCommonDivisor(topElement, currentNumber)) * currentNumber`. This new `currentNumber` will then be re-evaluated against the new top of the stack (if any). 7. If they are coprime or `stackForResults` is empty, exit the inner `while` loop. 8. Push the `currentNumber` (which might be an original number or an accumulated LCM) onto `stackForResults`. 9. After processing all numbers, return `stackForResults`.
 * Dry Run: nums = [6, 4, 3, 2]
 *   1. stackForResults = []
 *   2. processingNumber = 6: currentNumber = 6. stackForResults is empty. Push 6. stackForResults = [6].
 *   3. processingNumber = 4: currentNumber = 4.
 *      - topElement = 6. calculatedGCD = findGreatestCommonDivisor(6, 4) = 2 (non-coprime).
 *      - Pop 6. stackForResults = [].
 *      - currentNumber = (6 / 2) * 4 = 12.
 *      - stackForResults is empty. Inner loop ends.
 *      - Push 12. stackForResults = [12].
 *   4. processingNumber = 3: currentNumber = 3.
 *      - topElement = 12. calculatedGCD = findGreatestCommonDivisor(12, 3) = 3 (non-coprime).
 *      - Pop 12. stackForResults = [].
 *      - currentNumber = (12 / 3) * 3 = 12.
 *      - stackForResults is empty. Inner loop ends.
 *      - Push 12. stackForResults = [12].
 *   5. processingNumber = 2: currentNumber = 2.
 *      - topElement = 12. calculatedGCD = findGreatestCommonDivisor(12, 2) = 2 (non-coprime).
 *      - Pop 12. stackForResults = [].
 *      - currentNumber = (12 / 2) * 2 = 12.
 *      - stackForResults is empty. Inner loop ends.
 *      - Push 12. stackForResults = [12].
 *   Final Result: [12]
 * Time Complexity: O(N * log(MAX_VALUE))
 * Space Complexity: O(N)
 */
var replaceNonCoprimes = function (nums) {
  const stackForResults = [];

  function findGreatestCommonDivisor(firstCandidate, secondCandidate) {
    let variableA = firstCandidate;
    let variableB = secondCandidate;
    while (variableB > 0) {
      let temporaryRemainder = variableA % variableB;
      variableA = variableB;
      variableB = temporaryRemainder;
    }
    return variableA;
  }

  for (const processingNumber of nums) {
    let currentNumber = processingNumber;

    while (stackForResults.length > 0) {
      const topElement = stackForResults[stackForResults.length - 1];
      const calculatedGCD = findGreatestCommonDivisor(
        topElement,
        currentNumber
      );

      if (calculatedGCD === 1) {
        break;
      }

      stackForResults.pop();
      currentNumber = (topElement / calculatedGCD) * currentNumber;
    }
    stackForResults.push(currentNumber);
  }

  return stackForResults;
};
