/**
 * Reordered Power Of 2
 * Time Complexity: O(D * log(MAX_N))
 * Space Complexity: O(D)
 */
var reorderedPowerOf2 = function (n) {
  const generateDigitFrequency = (targetNumber) => {
    const digitCounts = Array(10).fill(0);
    let currentRemaining = targetNumber;
    while (currentRemaining > 0) {
      const remainderDigit = currentRemaining % 10;
      digitCounts[remainderDigit]++;
      currentRemaining = Math.floor(currentRemaining / 10);
    }
    return digitCounts.join("");
  };

  const initialNumberFrequency = generateDigitFrequency(n);
  const highestPossiblePowerExponent = Math.floor(Math.log2(10 ** 9));

  for (
    let exponentValue = 0;
    exponentValue <= highestPossiblePowerExponent;
    exponentValue++
  ) {
    const powerOfTwoCalculation = 1 << exponentValue;
    const currentPowerOfTwoFrequency = generateDigitFrequency(
      powerOfTwoCalculation,
    );
    if (currentPowerOfTwoFrequency === initialNumberFrequency) {
      return true;
    }
  }

  return false;
};
