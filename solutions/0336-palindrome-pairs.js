/**
 * Palindrome Pairs
 * Time Complexity: O(N * L^2)
 * Space Complexity: O(S)
 */
var palindromePairs = function (words) {
  const allPairsResult = [];
  const wordToStringMap = new Map();
  const reversedStringToIndex = new Map();

  for (let mapPopulateIndex = 0; mapPopulateIndex < words.length; mapPopulateIndex++) {
    const currentWordValue = words[mapPopulateIndex];
    wordToStringMap.set(currentWordValue, mapPopulateIndex);
    const currentReversedWord = currentWordValue.split('').reverse().join('');
    reversedStringToIndex.set(currentReversedWord, mapPopulateIndex);
  }

  function checkSubstringPalindrome(targetString, startPosition, endPosition) {
    let leftScanPointer = startPosition;
    let rightScanPointer = endPosition;
    while (leftScanPointer < rightScanPointer) {
      if (targetString[leftScanPointer] !== targetString[rightScanPointer]) {
        return false;
      }
      leftScanPointer++;
      rightScanPointer--;
    }
    return true;
  }

  for (let processPairsIndex = 0; processPairsIndex < words.length; processPairsIndex++) {
    const currentProcessingWord = words[processPairsIndex];

    for (let splittingPoint = 0; splittingPoint <= currentProcessingWord.length; splittingPoint++) {
      const prefixEndPosition = splittingPoint - 1;
      const prefixIsPalindrome = checkSubstringPalindrome(currentProcessingWord, 0, prefixEndPosition);

      if (prefixIsPalindrome) {
        const segmentAfterPrefix = currentProcessingWord.slice(splittingPoint);
        if (reversedStringToIndex.has(segmentAfterPrefix)) {
          const matchedIndexFromReversed = reversedStringToIndex.get(segmentAfterPrefix);
          if (matchedIndexFromReversed !== processPairsIndex) {
            allPairsResult.push([matchedIndexFromReversed, processPairsIndex]);
          }
        }
      }

      if (splittingPoint < currentProcessingWord.length) {
        const suffixStartPosition = splittingPoint;
        const suffixEndPosition = currentProcessingWord.length - 1;
        const suffixIsPalindrome = checkSubstringPalindrome(currentProcessingWord, suffixStartPosition, suffixEndPosition);

        if (suffixIsPalindrome) {
          const segmentBeforeSuffix = currentProcessingWord.slice(0, splittingPoint);
          if (reversedStringToIndex.has(segmentBeforeSuffix)) {
            const matchedIndexForPrefix = reversedStringToIndex.get(segmentBeforeSuffix);
            if (matchedIndexForPrefix !== processPairsIndex) {
              allPairsResult.push([processPairsIndex, matchedIndexForPrefix]);
            }
          }
        }
      }
    }
  }

  return allPairsResult;
};