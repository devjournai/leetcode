/**
 * Maximum Product Of Word Lengths
 * Intuition: Two words have no common letters iff their letter bitmasks AND to 0. Then the candidate is the product of lengths; take the maximum.
 * Approach: 1. If fewer than 2 words, return 0. 2. For each word, OR 1 << (c - 'a') into a mask. 3. For every pair i < j, if masks do not overlap, update max length product. 4. Return that max.
 * Dry Run: words = ["abcw", "xtfn"].
 *   - Masks use bits for a,b,c,w vs x,t,f,n; AND is 0.
 *   - Product 4 * 4 = 16.
 * Time Complexity: O(N * L + N^2)
 * Space Complexity: O(N)
 */
var maxProduct = function (inputWords) {
  const totalWordsCount = inputWords.length;
  if (totalWordsCount < 2) {
    return 0;
  }

  const wordMasksStorage = new Array(totalWordsCount);

  for (
    let loopIndexOuter = 0;
    loopIndexOuter < totalWordsCount;
    loopIndexOuter++
  ) {
    let currentWordString = inputWords[loopIndexOuter];
    let wordSpecificMask = 0;
    for (
      let charScanIndex = 0;
      charScanIndex < currentWordString.length;
      charScanIndex++
    ) {
      let charOffsetValue =
        currentWordString.charCodeAt(charScanIndex) - "a".charCodeAt(0);
      wordSpecificMask |= 1 << charOffsetValue;
    }
    wordMasksStorage[loopIndexOuter] = wordSpecificMask;
  }

  let maximumProductFound = 0;

  for (
    let firstWordIndex = 0;
    firstWordIndex < totalWordsCount;
    firstWordIndex++
  ) {
    for (
      let secondWordIndex = firstWordIndex + 1;
      secondWordIndex < totalWordsCount;
      secondWordIndex++
    ) {
      let firstWordBitmask = wordMasksStorage[firstWordIndex];
      let secondWordBitmask = wordMasksStorage[secondWordIndex];

      if ((firstWordBitmask & secondWordBitmask) === 0) {
        let lengthOfFirstWord = inputWords[firstWordIndex].length;
        let lengthOfSecondWord = inputWords[secondWordIndex].length;
        let potentialProduct = lengthOfFirstWord * lengthOfSecondWord;
        if (potentialProduct > maximumProductFound) {
          maximumProductFound = potentialProduct;
        }
      }
    }
  }

  return maximumProductFound;
};
