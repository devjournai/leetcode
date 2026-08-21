/**
 * Sum Of K Mirror Numbers
 * Intuition: K-mirror numbers are palindromes in both base-10 and base-k. It's computationally easier to generate base-10 palindromes and then check their base-k representation, rather than generating base-k palindromes and converting to base-10. We generate base-10 palindromes incrementally by length, checking each for the k-mirror property until we have found the required 'n' numbers.
 * Approach: 1. Initialize an empty list for found k-mirror numbers and a sum accumulator. 2. Loop, starting with base-10 palindromes of length 1, incrementing the length in each iteration. 3. Inside the loop, generate all base-10 palindromes for the current length. 4. For each generated base-10 palindrome: a. Convert it to its base-k string representation. b. Check if both its base-10 string (implicitly, as they are generated as palindromes) and its base-k string are palindromes. c. If both conditions are met, add the number to the list of found k-mirror numbers and update the sum. 5. Continue this process until 'n' k-mirror numbers have been found. 6. Return the total accumulated sum.
 * Dry Run: k = 2, n = 3
 * 1. Initialize `foundMirrorNumbers = []`, `totalAccumulatedSum = 0`.
 * 2. `currentDigitLength = 1`:
 *    a. `createPalindromicNumbers(1)` generates `[1, 2, 3, 4, 5, 6, 7, 8, 9]`.
 *    b. Iterate `generatedPalindromeValue` from this list:
 *       - `generatedPalindromeValue = 1`: `testKMirrorCandidate(1, 2)`
 *         - `convertToBaseRepresentation(1, 2)` returns `'1'`.
 *         - `checkPalindromeStatus('1')` returns `true`.
 *         - Result: `true`. `foundMirrorNumbers = [1]`, `totalAccumulatedSum = 1`.
 *       - `generatedPalindromeValue = 2`: Base-10 `2` is not a palindrome. (This is incorrect, `createPalindromicNumbers` only generates base-10 palindromes. `2` is not a palindrome of length 1, it's just a single digit. All single digits are palindromes. Let's assume `createPalindromicNumbers` generates `1` through `9` as single-digit palindromes).
 *       - `generatedPalindromeValue = 2`: `testKMirrorCandidate(2, 2)`
 *         - `convertToBaseRepresentation(2, 2)` returns `'10'`.
 *         - `checkPalindromeStatus('10')` returns `false`. Result: `false`.
 *       - `generatedPalindromeValue = 3`: `testKMirrorCandidate(3, 2)`
 *         - `convertToBaseRepresentation(3, 2)` returns `'11'`.
 *         - `checkPalindromeStatus('11')` returns `true`.
 *         - Result: `true`. `foundMirrorNumbers = [1, 3]`, `totalAccumulatedSum = 4`.
 *       - `generatedPalindromeValue = 4`: `testKMirrorCandidate(4, 2)`
 *         - `convertToBaseRepresentation(4, 2)` returns `'100'`.
 *         - `checkPalindromeStatus('100')` returns `false`. Result: `false`.
 *       - `generatedPalindromeValue = 5`: `testKMirrorCandidate(5, 2)`
 *         - `convertToBaseRepresentation(5, 2)` returns `'101'`.
 *         - `checkPalindromeStatus('101')` returns `true`.
 *         - Result: `true`. `foundMirrorNumbers = [1, 3, 5]`, `totalAccumulatedSum = 9`.
 *       - `foundMirrorNumbers.length` (3) equals `totalRequiredCount` (3), so break the inner loop.
 *    c. `foundMirrorNumbers.length` (3) equals `totalRequiredCount` (3), so break the outer loop.
 * 3. Return `totalAccumulatedSum` which is `9`.
 * Time Complexity: O(10^(L_max/2) * L_max * log_k(10))
 * Space Complexity: O(10^(L_max/2))
 */
var kMirror = function (k, n) {
  const foundMirrorNumbers = [];
  let totalAccumulatedSum = 0;
  const baseK = k;
  const totalRequiredCount = n;

  for (let currentDigitLength = 1; ; currentDigitLength++) {
    if (foundMirrorNumbers.length === totalRequiredCount) {
      break;
    }

    const generatedNumbers = createPalindromicNumbers(currentDigitLength);

    for (const generatedPalindromeValue of generatedNumbers) {
      if (foundMirrorNumbers.length === totalRequiredCount) {
        break;
      }
      if (testKMirrorCandidate(generatedPalindromeValue, baseK)) {
        foundMirrorNumbers.push(generatedPalindromeValue);
        totalAccumulatedSum += generatedPalindromeValue;
      }
    }
  }

  return totalAccumulatedSum;
};

function convertToBaseRepresentation(originalNumber, baseRadix) {
  if (originalNumber === 0) {
    return "0";
  }

  let baseKString = "";
  let tempNumber = originalNumber;
  for (; tempNumber > 0; tempNumber = Math.floor(tempNumber / baseRadix)) {
    baseKString = (tempNumber % baseRadix) + baseKString;
  }

  return baseKString;
}

function checkPalindromeStatus(inputStringSequence) {
  let leftPointer = 0;
  let rightPointer = inputStringSequence.length - 1;

  for (; leftPointer < rightPointer; leftPointer++, rightPointer--) {
    if (
      inputStringSequence[leftPointer] !== inputStringSequence[rightPointer]
    ) {
      return false;
    }
  }

  return true;
}

function testKMirrorCandidate(candidateDecimal, targetRadix) {
  const baseKCharacterSequence = convertToBaseRepresentation(
    candidateDecimal,
    targetRadix
  );
  return checkPalindromeStatus(baseKCharacterSequence);
}

function createPalindromicNumbers(palLength) {
  const palindromeCollection = [];

  if (palLength === 1) {
    let currentSingleDigit = 1;
    for (; currentSingleDigit <= 9; currentSingleDigit++) {
      palindromeCollection.push(currentSingleDigit);
    }
    return palindromeCollection;
  }

  const isPalLengthEven = palLength % 2 === 0;

  if (isPalLengthEven) {
    const halfLength = palLength / 2;
    const initialValue = Math.pow(10, halfLength - 1);
    const finalValue = Math.pow(10, halfLength) - 1;

    let segmentIterator = initialValue;
    for (; segmentIterator <= finalValue; segmentIterator++) {
      const firstSegment = segmentIterator.toString();
      const secondSegment = firstSegment.split("").reverse().join("");
      palindromeCollection.push(parseInt(firstSegment + secondSegment));
    }
  } else {
    const halfLength = Math.floor(palLength / 2);
    const initialValue = Math.pow(10, halfLength);
    const finalValue = Math.pow(10, halfLength + 1) - 1;

    let segmentIterator = initialValue;
    for (; segmentIterator <= finalValue; segmentIterator++) {
      const prefixPart = Math.floor(segmentIterator / 10);
      const middleDigit = segmentIterator % 10;
      const firstSegment = prefixPart.toString();
      const secondSegment = firstSegment.split("").reverse().join("");
      palindromeCollection.push(
        parseInt(firstSegment + middleDigit + secondSegment)
      );
    }
  }

  return palindromeCollection;
}
