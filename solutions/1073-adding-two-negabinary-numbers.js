/**
 * Adding Two Negabinary Numbers
 * Intuition: Base −2 addition is like binary from the LSB, but carry is (sum−bit)/(−2) because 2×(−2)^k = −(−2)^{k+1}. Extra carry may create a new higher digit; then strip leading zeros.
 * Approach: 1. Walk both arrays from the end with carry. 2. Digit = sum & 1; carry = (sum−digit)/(−2). 3. Reverse the digits. 4. Drop leading zeros except the last zero.
 * Dry Run: [1,1,1,1,1] + [1,0,1] → process LSBs with carry through −2; result [1,0,0,0,0].
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
