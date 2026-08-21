/**
 * Additive Number
 * Intuition: An additive number is a Fibonacci-like split. Try every pair of starting numbers (no leading zeros), then check that the rest of the string is exactly their successive BigInt sums.
 * Approach: 1. Length < 3 → false. 2. Nested loops pick first and second segments; break a loop on leading zeros. 3. verify: if index==n return count>=3; else the next substring must equal (a+b).toString(), then recurse with (b, a+b). 4. Return true on the first success.
 * Dry Run: num="112358".
 *   - first=1, second=1, then 2,3,5,8 match. Return true.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var isAdditiveNumber = function (num) {
  const totalStringLength = num.length;

  if (totalStringLength < 3) {
    return false;
  }
  const verifyAdditiveSequence = (
    currentScanIndex,
    previousNumberOne,
    previousNumberTwo,
    sequenceElementCount
  ) => {
    if (currentScanIndex === totalStringLength) {
      return sequenceElementCount >= 3;
    }

    const calculatedSum = previousNumberOne + previousNumberTwo;
    const calculatedSumString = calculatedSum.toString();
    const sumStringLength = calculatedSumString.length;

    if (
      currentScanIndex + sumStringLength > totalStringLength ||
      num.substring(currentScanIndex, currentScanIndex + sumStringLength) !==
        calculatedSumString
    ) {
      return false;
    }

    return verifyAdditiveSequence(
      currentScanIndex + sumStringLength,
      previousNumberTwo,
      calculatedSum,
      sequenceElementCount + 1
    );
  };

  for (
    let firstEndIndex = 0;
    firstEndIndex < totalStringLength - 2;
    firstEndIndex++
  ) {
    const firstSegmentValue = num.substring(0, firstEndIndex + 1);
    if (firstSegmentValue.length > 1 && firstSegmentValue[0] === "0") {
      break;
    }
    const firstNumericValue = BigInt(firstSegmentValue);

    for (
      let secondEndIndex = firstEndIndex + 1;
      secondEndIndex < totalStringLength - 1;
      secondEndIndex++
    ) {
      const secondSegmentValue = num.substring(
        firstEndIndex + 1,
        secondEndIndex + 1
      );
      if (secondSegmentValue.length > 1 && secondSegmentValue[0] === "0") {
        break;
      }
      const secondNumericValue = BigInt(secondSegmentValue);

      if (
        verifyAdditiveSequence(
          secondEndIndex + 1,
          firstNumericValue,
          secondNumericValue,
          2
        )
      ) {
        return true;
      }
    }
  }

  return false;
};
