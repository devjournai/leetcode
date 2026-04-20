/**
 * Convert To Base 2
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var baseNeg2 = function (n) {
  if (n === 0) {
    return "0";
  }

  function calculateBaseNeg2(currentNumberValue) {
    if (currentNumberValue === 0) {
      return "";
    }

    const bitValue = currentNumberValue & 1;
    const nextIterationValue = (currentNumberValue - bitValue) / -2;

    return calculateBaseNeg2(nextIterationValue) + bitValue.toString();
  }

  return calculateBaseNeg2(n);
};
