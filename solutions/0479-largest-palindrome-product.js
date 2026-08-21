/**
 * Largest Palindrome Product
 * Intuition: For n>1 the largest palindrome product of two n-digit numbers has 2n digits. Search candidate left halves from the top; a palindrome L||reverse(L) factors as two n-digit integers iff a related quadratic in the digit-offsets has a perfect-square discriminant.
 * Approach: 1. n=1 → 9. 2. Let `largestNdigit=10^n-1`, `smallestNdigit=10^(n-1)`, `powerOfTenN=10^n`. 3. For `currentOffsetSum` from 1 upward, left half = largest − offset + 1; build the palindrome’s right half as the reverse of that half. 4. Discriminant `offset² - 4*rightHalf`; skip if negative or not a perfect square (check `sqrt` and `sqrt+1`). 5. Offsets `(s±sqrt)/2` give factors `10^n - offset`; if both lie in the n-digit range, return palindrome % 1337.
 * Dry Run: n = 2. largest=99, smallest=10, 10^n=100.
 *   - Early offsets fail the square/range checks until left half 99 yields palindrome 9009 = 91×99, both 2-digit → 9009 % 1337 = 987.
 * Time Complexity: O(10^n * n)
 * Space Complexity: O(n)
 */
var largestPalindrome = function (n) {
  if (n === 1) {
    return 9;
  }

  const largestNdigit = 10 ** n - 1;
  const smallestNdigit = 10 ** (n - 1);
  const powerOfTenN = BigInt(10 ** n);

  for (
    let currentOffsetSum = 1;
    currentOffsetSum <= largestNdigit - smallestNdigit + 1;
    currentOffsetSum++
  ) {
    const potentialLeftHalf = largestNdigit - currentOffsetSum + 1;

    const stringRepresentation = String(potentialLeftHalf);
    const reversedRepresentation = stringRepresentation
      .split("")
      .reverse()
      .join("");
    const potentialRightHalfReversed = BigInt(reversedRepresentation);

    const sumOfSquareCheck =
      BigInt(currentOffsetSum) * BigInt(currentOffsetSum);
    const fourTimesProduct = 4n * potentialRightHalfReversed;
    const discriminantValue = sumOfSquareCheck - fourTimesProduct;

    if (discriminantValue < 0n) {
      continue;
    }

    const sqrtRootCandidate = BigInt(
      Math.floor(Math.sqrt(Number(discriminantValue)))
    );

    const rootCheckOne = sqrtRootCandidate * sqrtRootCandidate;
    const rootCheckTwo = (sqrtRootCandidate + 1n) * (sqrtRootCandidate + 1n);

    if (
      rootCheckOne !== discriminantValue &&
      rootCheckTwo !== discriminantValue
    ) {
      continue;
    }

    const actualLeftOffset =
      (BigInt(currentOffsetSum) + sqrtRootCandidate) / 2n;
    const actualRightOffset =
      (BigInt(currentOffsetSum) - sqrtRootCandidate) / 2n;

    const factorOne = powerOfTenN - actualLeftOffset;
    const factorTwo = powerOfTenN - actualRightOffset;

    if (
      factorOne >= BigInt(smallestNdigit) &&
      factorTwo >= BigInt(smallestNdigit) &&
      factorOne <= BigInt(largestNdigit) &&
      factorTwo <= BigInt(largestNdigit)
    ) {
      const constructedPalindrome =
        BigInt(potentialLeftHalf) * powerOfTenN + potentialRightHalfReversed;
      return Number(constructedPalindrome % 1337n);
    }
  }
  return -1;
};
