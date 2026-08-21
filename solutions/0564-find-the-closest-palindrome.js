/**
 * Find The Closest Palindrome
 * Intuition: Nearest palindrome besides n itself comes from mirroring the left half (and left-1 / left+1) plus power-of-ten boundaries (999… and 100…001). Pick the closest by absolute difference, smaller on a tie. Handle tiny and all-9s/10^k specials first.
 * Approach: 1. BigInt `n`; early cases ≤10, 11, 10…0, all 9s. 2. `constructPalindrome` mirrors a left half for even/odd length. 3. Candidates: 10^{L-1}-1, mirror(left-1), mirror(left), mirror(left+1), 10^L+1, excluding n. 4. Scan for min |diff|, then smaller value. 5. Return that string.
 * Dry Run: n = "123".
 *   - Left 12; candidates include 121, 111, 131, 99, 1001. Closest ≠123 is 121.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var nearestPalindromic = function (n) {
  const originalNumber = BigInt(n);
  const stringLength = n.length;

  if (originalNumber <= 10n) return String(originalNumber - 1n);
  if (originalNumber === 11n) return "9";

  const allZeroesSequence = "0".repeat(stringLength - 1);
  const specificLeadingOne = "1" + allZeroesSequence;
  if (n === specificLeadingOne) return String(originalNumber - 1n);

  const allNinesSequence = "9".repeat(stringLength);
  if (n === allNinesSequence) return String(originalNumber + 2n);

  function constructPalindrome(leftPartNumeric, totalLengthValue) {
    const leftPartString = String(leftPartNumeric);
    const reversedRightSegment = leftPartString.split("").reverse().join("");
    return totalLengthValue % 2 === 0
      ? leftPartString + reversedRightSegment
      : leftPartString + reversedRightSegment.slice(1);
  }

  const initialLeftSegment = n.slice(0, Math.ceil(stringLength / 2));
  const initialLeftValue = BigInt(initialLeftSegment);

  const firstBoundaryCandidate = String(10n ** BigInt(stringLength - 1) - 1n);
  const secondCentralCandidate = constructPalindrome(
    initialLeftValue - 1n,
    stringLength
  );
  const thirdCentralCandidate = constructPalindrome(
    initialLeftValue,
    stringLength
  );
  const fourthCentralCandidate = constructPalindrome(
    initialLeftValue + 1n,
    stringLength
  );
  const fifthBoundaryCandidate = String(10n ** BigInt(stringLength) + 1n);

  const possiblePalindromes = [
    firstBoundaryCandidate,
    secondCentralCandidate,
    thirdCentralCandidate,
    fourthCentralCandidate,
    fifthBoundaryCandidate,
  ].filter((palindromeString) => palindromeString !== n);

  let currentBestPalindrome = possiblePalindromes[0];
  let minimumDifference =
    BigInt(currentBestPalindrome) > originalNumber
      ? BigInt(currentBestPalindrome) - originalNumber
      : originalNumber - BigInt(currentBestPalindrome);

  let iterationIndex = 1;
  while (iterationIndex < possiblePalindromes.length) {
    const candidatePalindrome = possiblePalindromes[iterationIndex];
    const candidateNumber = BigInt(candidatePalindrome);
    const currentDifference =
      candidateNumber > originalNumber
        ? candidateNumber - originalNumber
        : originalNumber - candidateNumber;

    if (currentDifference < minimumDifference) {
      minimumDifference = currentDifference;
      currentBestPalindrome = candidatePalindrome;
    } else if (currentDifference === minimumDifference) {
      if (candidateNumber < BigInt(currentBestPalindrome)) {
        currentBestPalindrome = candidatePalindrome;
      }
    }
    iterationIndex++;
  }

  return currentBestPalindrome;
};
