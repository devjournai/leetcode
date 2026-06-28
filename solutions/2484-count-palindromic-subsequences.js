/**
 * Count Palindromic Subsequences
 * Intuition: A palindromic subsequence of length 5 has the form `abcba`. We can iterate through each character in the string as the middle character (`c`). For each middle character, we need to count pairs `(a, b)` to its left and pairs `(b, a)` to its right.
 * Approach:
 * 1. Initialize `moduloValue` for results. Convert the input string `sString` to an array of numbers `digitsArray` for easier arithmetic.
 * 2. Create a 2D array `prefixTwoDigitCounts` to store counts of all possible two-digit patterns `s[x]s[y]` where `x < y` and `y` is up to the current index. `prefixTwoDigitCounts[i][pairValue]` stores the count of `pairValue` ending at or before index `i`.
 *    Iterate `currentElementIndex` from 1 to `stringLength - 1`. For each `currentElementIndex`, copy counts from `prefixTwoDigitCounts[currentElementIndex - 1]`. Then, iterate `firstElementIndex` from 0 to `currentElementIndex - 1` to find new pairs `s[firstElementIndex]s[currentElementIndex]` and increment their counts.
 * 3. Create a 2D array `suffixTwoDigitCounts` similarly, but for pairs `s[x]s[y]` where `x < y` and `x` is from the current index onwards. `suffixTwoDigitCounts[i][pairValue]` stores the count of `pairValue` starting at or after index `i`.
 *    Iterate `iterateIndex` from `stringLength - 2` down to 0. For each `iterateIndex`, copy counts from `suffixTwoDigitCounts[iterateIndex + 1]`. Then, iterate `secondElementIndex` from `iterateIndex + 1` to `stringLength - 1` to find new pairs `s[iterateIndex]s[secondElementIndex]` and increment their counts.
 * 4. Initialize `totalPalindromes` to 0. Iterate `middleCharIndex` from 2 to `stringLength - 3` (inclusive), as a 5-length palindrome needs at least two characters on either side of the middle character.
 * 5. Inside this loop, iterate `firstDigit` from 0 to 9 and `secondDigit` from 0 to 9 to consider all possible `ab` patterns.
 * 6. Calculate `leftPairValue = firstDigit * 10 + secondDigit` and `rightPairValue = secondDigit * 10 + firstDigit`.
 * 7. Retrieve `leftCount = prefixTwoDigitCounts[middleCharIndex - 1][leftPairValue]` and `rightCount = suffixTwoDigitCounts[middleCharIndex + 1][rightPairValue]`.
 * 8. Add `(leftCount * rightCount)` to `totalPalindromes`, applying the modulo operation at each step to prevent overflow.
 * 9. Return `totalPalindromes`.
 * Dry Run: s = "10101", stringLength = 5
 * moduloValue = 1e9 + 7
 * digitsArray = [1, 0, 1, 0, 1]
 *
 * prefixTwoDigitCounts (ppp):
 * ppp[0] = all zeros
 * currentElementIndex = 1 (s[1]=0): ppp[1][10] = 1 (from s[0]s[1])
 * currentElementIndex = 2 (s[2]=1): ppp[2][10]=1, ppp[2][11]=1 (from s[0]s[2]), ppp[2][01]=1 (from s[1]s[2])
 * currentElementIndex = 3 (s[3]=0): ppp[3][10]=2 (from s[0]s[3]), ppp[3][11]=1, ppp[3][01]=1, ppp[3][00]=1 (from s[1]s[3]), ppp[3][10]++ -> ppp[3][10]=3 (from s[2]s[3])
 * ppp[3]: {10:3, 11:1, 01:1, 00:1} (all other pairs 0)
 * currentElementIndex = 4 (s[4]=1): ppp[4][10]=3, ppp[4][11]=2 (from s[0]s[4]), ppp[4][01]=2 (from s[1]s[4]), ppp[4][00]=1, ppp[4][11]++ -> ppp[4][11]=3 (from s[2]s[4]), ppp[4][01]++ -> ppp[4][01]=3 (from s[3]s[4])
 *
 * suffixTwoDigitCounts (spp):
 * spp[4] = all zeros
 * iterateIndex = 3 (s[3]=0): spp[3][01] = 1 (from s[3]s[4])
 * iterateIndex = 2 (s[2]=1): spp[2][01]=1, spp[2][10]=1 (from s[2]s[3]), spp[2][11]=1 (from s[2]s[4])
 * iterateIndex = 1 (s[1]=0): spp[1][01]=1, spp[1][10]=1, spp[1][11]=1, spp[1][00]=1 (from s[1]s[2]), spp[1][01]++ -> spp[1][01]=2 (from s[1]s[3]), spp[1][01]++ -> spp[1][01]=3 (from s[1]s[4])
 * spp[1]: {01:3, 10:1, 11:1, 00:1}
 * iterateIndex = 0 (s[0]=1): spp[0][01]=3, spp[0][10]=2 (from s[0]s[1]), spp[0][11]=2 (from s[0]s[2]), spp[0][00]=1, spp[0][10]++ -> spp[0][10]=3 (from s[0]s[3]), spp[0][11]++ -> spp[0][11]=3 (from s[0]s[4])
 *
 * totalPalindromes = 0
 * middleCharIndex = 2 (s[2]=1):
 *   firstDigit = 1, secondDigit = 0: leftPairValue=10, rightPairValue=01
 *     leftCount = ppp[1][10] = 1
 *     rightCount = spp[3][01] = 1
 *     totalPalindromes = (0 + (1 * 1)) % moduloValue = 1
 * (This corresponds to "10101" where s[0]s[1] is 10, s[2] is 1, s[3]s[4] is 01)
 * Other firstDigit/secondDigit combinations yield 0.
 *
 * Result for "10101" is 1.
 * Time Complexity: O(N * 100 + N * 100 + N * 10 * 10)
 * Space Complexity: O(N * 100 + N * 100)
 */
var countPalindromes = function (sString) {
  const moduloValue = 1e9 + 7;
  const stringLength = sString.length;

  const digitsArray = new Array(stringLength);
  for (let indexValue = 0; indexValue < stringLength; indexValue++) {
    digitsArray[indexValue] = parseInt(sString[indexValue]);
  }

  const prefixTwoDigitCounts = new Array(stringLength)
    .fill(0)
    .map(() => new Array(100).fill(0));
  const suffixTwoDigitCounts = new Array(stringLength)
    .fill(0)
    .map(() => new Array(100).fill(0));

  for (
    let currentElementIndex = 1;
    currentElementIndex < stringLength;
    currentElementIndex++
  ) {
    for (let pairedValue = 0; pairedValue < 100; pairedValue++) {
      prefixTwoDigitCounts[currentElementIndex][pairedValue] =
        prefixTwoDigitCounts[currentElementIndex - 1][pairedValue];
    }
    for (
      let firstElementIndex = 0;
      firstElementIndex < currentElementIndex;
      firstElementIndex++
    ) {
      const formPair =
        digitsArray[firstElementIndex] * 10 + digitsArray[currentElementIndex];
      prefixTwoDigitCounts[currentElementIndex][formPair]++;
    }
  }

  for (let iterateIndex = stringLength - 2; iterateIndex >= 0; iterateIndex--) {
    for (let currentPairValue = 0; currentPairValue < 100; currentPairValue++) {
      suffixTwoDigitCounts[iterateIndex][currentPairValue] =
        suffixTwoDigitCounts[iterateIndex + 1][currentPairValue];
    }
    for (
      let secondElementIndex = iterateIndex + 1;
      secondElementIndex < stringLength;
      secondElementIndex++
    ) {
      const formedPair =
        digitsArray[iterateIndex] * 10 + digitsArray[secondElementIndex];
      suffixTwoDigitCounts[iterateIndex][formedPair]++;
    }
  }

  let totalPalindromes = 0;
  for (
    let middleCharIndex = 2;
    middleCharIndex < stringLength - 2;
    middleCharIndex++
  ) {
    for (let firstDigit = 0; firstDigit < 10; firstDigit++) {
      for (let secondDigit = 0; secondDigit < 10; secondDigit++) {
        const leftPairValue = firstDigit * 10 + secondDigit;
        const rightPairValue = secondDigit * 10 + firstDigit;

        const leftCount =
          prefixTwoDigitCounts[middleCharIndex - 1][leftPairValue];
        const rightCount =
          suffixTwoDigitCounts[middleCharIndex + 1][rightPairValue];

        const currentCombinations = (leftCount * rightCount) % moduloValue;
        totalPalindromes =
          (totalPalindromes + currentCombinations) % moduloValue;
      }
    }
  }

  return totalPalindromes;
};
