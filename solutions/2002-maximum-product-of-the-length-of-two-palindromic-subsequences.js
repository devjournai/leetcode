/**
 * Maximum Product Of The Length Of The Two Palindromic Subsequences
 * Intuition: Given the small constraint on string length (N <= 12), we can explore all possible subsequences using bitmasks. Since we need two disjoint palindromic subsequences, we can iterate through all possible pairs of bitmasks, ensuring they don't share any character indices, and then check if the corresponding subsequences are palindromes.
 * Approach: 1. Initialize `maximumProduct` to 0. 2. Define a helper function `checkPalindromeAndGetLength(inputString, currentMask, totalLength)`: This function constructs a subsequence based on `currentMask` from `inputString` and `totalLength`. It then checks if the constructed subsequence is a palindrome. If it is, its length is returned; otherwise, 0 is returned. 3. Iterate `firstMaskOption` from 1 to `2^N - 1` (where N is `stringLength`). 4. For each `firstMaskOption`, call `checkPalindromeAndGetLength` to get `firstSubseqLength`. If `firstSubseqLength` is 0, continue to the next `firstMaskOption`. 5. Iterate `secondMaskOption` from 1 to `2^N - 1`. 6. Check if `firstMaskOption` and `secondMaskOption` are disjoint using `(firstMaskOption & secondMaskOption) === 0`. If they are not disjoint, continue to the next `secondMaskOption`. 7. For each disjoint `secondMaskOption`, call `checkPalindromeAndGetLength` to get `secondSubseqLength`. If `secondSubseqLength` is 0, continue to the next `secondMaskOption`. 8. Calculate the `currentProduct` as `firstSubseqLength * secondSubseqLength`. 9. Update `maximumProduct = Math.max(maximumProduct, currentProduct)`. 10. Return `maximumProduct`.
 * Dry Run: s = "ab"
 *   stringLength = 2, maximumProduct = 0
 *   checkPalindromeAndGetLength("ab", 1, 2) -> returns 1 ('a')
 *   checkPalindromeAndGetLength("ab", 2, 2) -> returns 1 ('b')
 *   checkPalindromeAndGetLength("ab", 3, 2) -> returns 0 ('ab' is not a palindrome)
 *
 *   firstMaskOption loop (1 to 3):
 *     firstMaskOption = 1 (binary 01)
 *       firstSubseqLength = 1 ('a')
 *       secondMaskOption loop (1 to 3):
 *         secondMaskOption = 1 (binary 01): (1 & 1) !== 0, skip.
 *         secondMaskOption = 2 (binary 10): (1 & 2) === 0 (disjoint).
 *           secondSubseqLength = 1 ('b').
 *           currentProduct = 1 * 1 = 1.
 *           maximumProduct = max(0, 1) = 1.
 *         secondMaskOption = 3 (binary 11): (1 & 3) !== 0, skip.
 *     firstMaskOption = 2 (binary 10)
 *       firstSubseqLength = 1 ('b')
 *       secondMaskOption loop (1 to 3):
 *         secondMaskOption = 1 (binary 01): (2 & 1) === 0 (disjoint).
 *           secondSubseqLength = 1 ('a').
 *           currentProduct = 1 * 1 = 1.
 *           maximumProduct = max(1, 1) = 1.
 *         secondMaskOption = 2 (binary 10): (2 & 2) !== 0, skip.
 *         secondMaskOption = 3 (binary 11): (2 & 3) !== 0, skip.
 *     firstMaskOption = 3 (binary 11)
 *       firstSubseqLength = 0 ('ab' is not a palindrome), skip to next firstMaskOption.
 *
 *   Final maximumProduct = 1.
 * Time Complexity: O(N * 4^N)
 * Space Complexity: O(N)
 */
var maxProduct = function (s) {
  const stringLength = s.length;
  let maximumProduct = 0;

  const checkPalindromeAndGetLength = (
    inputString,
    currentMask,
    totalLength
  ) => {
    const subsequenceLetters = [];
    for (
      let characterIdentifier = 0;
      characterIdentifier < totalLength;
      characterIdentifier++
    ) {
      if (((currentMask >>> characterIdentifier) & 1) === 1) {
        subsequenceLetters.push(inputString[characterIdentifier]);
      }
    }

    const subsequenceSize = subsequenceLetters.length;
    if (subsequenceSize === 0) {
      return 0;
    }

    let leftBoundary = 0;
    let rightBoundary = subsequenceSize - 1;
    while (leftBoundary < rightBoundary) {
      if (
        subsequenceLetters[leftBoundary] !== subsequenceLetters[rightBoundary]
      ) {
        return 0;
      }
      leftBoundary++;
      rightBoundary--;
    }
    return subsequenceSize;
  };

  for (
    let firstMaskOption = 1;
    firstMaskOption < 1 << stringLength;
    firstMaskOption++
  ) {
    const firstSubseqLength = checkPalindromeAndGetLength(
      s,
      firstMaskOption,
      stringLength
    );
    if (firstSubseqLength === 0) {
      continue;
    }

    for (
      let secondMaskOption = 1;
      secondMaskOption < 1 << stringLength;
      secondMaskOption++
    ) {
      if ((firstMaskOption & secondMaskOption) !== 0) {
        continue;
      }

      const secondSubseqLength = checkPalindromeAndGetLength(
        s,
        secondMaskOption,
        stringLength
      );
      if (secondSubseqLength === 0) {
        continue;
      }

      const currentProduct = firstSubseqLength * secondSubseqLength;
      if (currentProduct > maximumProduct) {
        maximumProduct = currentProduct;
      }
    }
  }

  return maximumProduct;
};
