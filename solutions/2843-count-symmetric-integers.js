/**
 * Count Symmetric Integers
 * Intuition: The definition of a symmetric integer involves comparing sums of its first and second halves. This suggests converting the number to a string to easily access individual digits by index. The condition that numbers must have an even digit count is a primary filter.
 * Approach: 1. Initialize a counter for symmetric integers. 2. Iterate through each number in the given range [low, high]. 3. For each number, convert it to a string to determine its total digit count. 4. If the total digit count is odd, the number cannot be symmetric; continue to the next number. 5. If the total digit count is even, divide the string of digits into two equal halves. 6. Calculate the sum of digits for the first half. 7. Calculate the sum of digits for the second half. 8. If the two sums are equal, increment the symmetric integer counter. 9. After iterating through all numbers, return the final count.
 * Dry Run: low = 10, high = 120
 * totalSymmetricCount = 0
 * currentIterationNumber = 10: checkSymmetry(10) -> "10", length 2. firstHalf ["1"] sum 1. secondHalf ["0"] sum 0. sums differ. false.
 * currentIterationNumber = 11: checkSymmetry(11) -> "11", length 2. firstHalf ["1"] sum 1. secondHalf ["1"] sum 1. sums equal. true. totalSymmetricCount = 1.
 * ... (skipped numbers)
 * currentIterationNumber = 99: checkSymmetry(99) -> "99", length 2. firstHalf ["9"] sum 9. secondHalf ["9"] sum 9. sums equal. true. totalSymmetricCount = 2.
 * currentIterationNumber = 100: checkSymmetry(100) -> "100", length 3. odd length. false.
 * ... (skipped numbers up to 120, all have odd length 3)
 * Final totalSymmetricCount = 2.
 * Time Complexity: O((high - low + 1) * log10(high))
 * Space Complexity: O(log10(high))
 */
var countSymmetricIntegers = function (low, high) {
  let totalSymmetricCount = 0;

  function checkSymmetry(inputNumber) {
    const numberString = inputNumber.toString();
    const totalDigits = numberString.length;

    if (totalDigits % 2 !== 0) {
      return false;
    }

    const midpointIndex = totalDigits / 2;
    const firstHalfDigits = numberString.slice(0, midpointIndex);
    const secondHalfDigits = numberString.slice(midpointIndex);

    let sumFirstDigits = 0;
    for (
      let digitIndex = 0;
      digitIndex < firstHalfDigits.length;
      digitIndex++
    ) {
      sumFirstDigits += Number(firstHalfDigits[digitIndex]);
    }

    let sumSecondDigits = 0;
    for (
      let anotherDigitIndex = 0;
      anotherDigitIndex < secondHalfDigits.length;
      anotherDigitIndex++
    ) {
      sumSecondDigits += Number(secondHalfDigits[anotherDigitIndex]);
    }

    return sumFirstDigits === sumSecondDigits;
  }

  for (
    let currentIterationNumber = low;
    currentIterationNumber <= high;
    currentIterationNumber++
  ) {
    if (checkSymmetry(currentIterationNumber)) {
      totalSymmetricCount++;
    }
  }

  return totalSymmetricCount;
};
