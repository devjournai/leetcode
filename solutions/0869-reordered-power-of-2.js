/**
 * Reordered Power Of 2
 * Intuition: n can be rearranged into a power of two iff they share the same digit multiset (no leading-zero issue because powers of two never start with 0).
 * Approach: 1. `generateDigitFrequency` counts digits 0–9 and joins the 10-length array as a signature. 2. Compare n's signature to 1<<e for e=0..floor(log2(1e9)). 3. Return true on match else false.
 * Dry Run: n=46. Signature of 46 is one 4 and one 6; 1<<6=64 has one 6 and one 4 → true. n=10 vs 8,16,32,... no match → false.
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
      powerOfTwoCalculation
    );
    if (currentPowerOfTwoFrequency === initialNumberFrequency) {
      return true;
    }
  }

  return false;
};
