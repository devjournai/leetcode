/**
 * Reverse Integer
 * Time Complexity: O(log10(n))
 * Space Complexity: O(log10(n))
 */
var reverse = function (value) {
  const MAX_INT = Math.pow(2, 31) - 1;
  const MIN_INT = -Math.pow(2, 31);

  let tempValue = Math.abs(value);
  let processedResult = 0;

  while (tempValue > 0) {
    const digit = tempValue % 10;
    processedResult = processedResult * 10 + digit;
    tempValue = Math.floor(tempValue / 10);
  }

  const finalResult = value < 0 ? -processedResult : processedResult;

  if (finalResult > MAX_INT || finalResult < MIN_INT) {
    return 0;
  }

  return finalResult;
};
