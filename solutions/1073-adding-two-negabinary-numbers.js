/**
 * Adding Two Negabinary Numbers
 * Time Complexity: O(max(N, M))
 * Space Complexity: O(max(N, M))
 */
var addNegabinary = function (arr1, arr2) {
  const outputSequence = [];
  let pointerA = arr1.length - 1;
  let pointerB = arr2.length - 1;
  let carryValue = 0;

  while (pointerA >= 0 || pointerB >= 0 || carryValue !== 0) {
    let valueA = 0;
    if (pointerA >= 0) {
      valueA = arr1[pointerA];
      pointerA--;
    }

    let valueB = 0;
    if (pointerB >= 0) {
      valueB = arr2[pointerB];
      pointerB--;
    }

    const currentSumValue = valueA + valueB + carryValue;
    const resultDigit = currentSumValue & 1;

    outputSequence.push(resultDigit);
    carryValue = (currentSumValue - resultDigit) / -2;
  }

  outputSequence.reverse();

  let significantStartIndex = 0;
  while (
    significantStartIndex < outputSequence.length - 1 &&
    outputSequence[significantStartIndex] === 0
  ) {
    significantStartIndex++;
  }

  return outputSequence.slice(significantStartIndex);
};
