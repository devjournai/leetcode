/**
 * Super Palindromes
 * Intuition: A super-palindrome is a palindrome that is the square of a palindrome. Generate palindromic bases by mirroring 1..99999 as odd- and even-length strings, square with BigInt, and test range plus palindrome-ness of the square.
 * Approach: 1. Parse bounds as BigInt. 2. For each base, build odd palindrome (mirror without last digit) and even palindrome (full mirror). 3. If square is in [low, high] and `checkPalindromeString` on the square, increment. 4. Early-return if square exceeds high and the palindrome itself is > 1e9. 5. Return the count.
 * Dry Run: left = "4", right = "1000".
 *   - Bases 1..: 2²=4 palindrome, 3²=9, 11²=121, 22²=484. Others out of range or square not palindrome. Count 4.
 * Time Complexity: O(R^(1/4) * log(R)^2)
 * Space Complexity: O(log R)
 */
var superpalindromesInRange = function (
  lowerBoundAsString,
  upperBoundAsString
) {
  const lowerLimitBigInt = BigInt(lowerBoundAsString);
  const upperLimitBigInt = BigInt(upperBoundAsString);
  let totalSuperPalindromes = 0;

  const checkPalindromeString = (textToCheck) => {
    let firstPointer = 0;
    let secondPointer = textToCheck.length - 1;
    while (firstPointer < secondPointer) {
      if (textToCheck[firstPointer] !== textToCheck[secondPointer]) {
        return false;
      }
      firstPointer++;
      secondPointer--;
    }
    return true;
  };

  const maximumCandidateBase = 100000;

  for (let currentBase = 1; currentBase < maximumCandidateBase; currentBase++) {
    const baseNumberString = currentBase.toString();

    const oddLengthCandidateBuilder = [];
    oddLengthCandidateBuilder.push(baseNumberString);
    for (
      let digitIndex = baseNumberString.length - 2;
      digitIndex >= 0;
      digitIndex--
    ) {
      oddLengthCandidateBuilder.push(baseNumberString[digitIndex]);
    }
    const oddPalindromeString = oddLengthCandidateBuilder.join("");

    const oddPalindromeBigInt = BigInt(oddPalindromeString);
    const oddPalindromeSquare = oddPalindromeBigInt * oddPalindromeBigInt;

    if (
      oddPalindromeSquare > upperLimitBigInt &&
      oddPalindromeBigInt > 1000000000n
    ) {
      return totalSuperPalindromes;
    }

    if (
      oddPalindromeSquare >= lowerLimitBigInt &&
      oddPalindromeSquare <= upperLimitBigInt
    ) {
      const oddSquareString = oddPalindromeSquare.toString();
      if (checkPalindromeString(oddSquareString)) {
        totalSuperPalindromes++;
      }
    }

    const evenLengthCandidateBuilder = [];
    evenLengthCandidateBuilder.push(baseNumberString);
    for (
      let characterIndex = baseNumberString.length - 1;
      characterIndex >= 0;
      characterIndex--
    ) {
      evenLengthCandidateBuilder.push(baseNumberString[characterIndex]);
    }
    const evenPalindromeString = evenLengthCandidateBuilder.join("");

    const evenPalindromeBigInt = BigInt(evenPalindromeString);
    const evenPalindromeSquare = evenPalindromeBigInt * evenPalindromeBigInt;

    if (
      evenPalindromeSquare > upperLimitBigInt &&
      evenPalindromeBigInt > 1000000000n
    ) {
      return totalSuperPalindromes;
    }

    if (
      evenPalindromeSquare >= lowerLimitBigInt &&
      evenPalindromeSquare <= upperLimitBigInt
    ) {
      const evenSquareString = evenPalindromeSquare.toString();
      if (checkPalindromeString(evenSquareString)) {
        totalSuperPalindromes++;
      }
    }
  }

  return totalSuperPalindromes;
};
