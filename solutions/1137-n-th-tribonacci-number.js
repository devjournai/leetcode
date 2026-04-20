/**
 * N Th Tribonacci Number
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var tribonacci = function (n) {
  if (n === 0) {
    return 0;
  }
  if (n === 1 || n === 2) {
    return 1;
  }

  let firstValue = 0;
  let secondValue = 1;
  let thirdValue = 1;

  let loopCounter = 3;
  while (loopCounter <= n) {
    let nextTribonacci = firstValue + secondValue + thirdValue;
    firstValue = secondValue;
    secondValue = thirdValue;
    thirdValue = nextTribonacci;
    loopCounter++;
  }

  return thirdValue;
};
