/**
 * Find The Shortest Superstring
 * Time Complexity: O(N^2 * L + N^2 * 2^N) where N is the number of words and L is the maximum word length.
 * Space Complexity: O(N * 2^N * L) where N is the number of words and L is the maximum word length.
*/ 
var shortestSuperstring = function(words) {
  const numWords = words.length;
  const overlapScores = Array(numWords).fill().map(() => Array(numWords).fill(0));

  for (let firstIterIndex = 0; firstIterIndex < numWords; firstIterIndex++) {
    for (let secondIterIndex = 0; secondIterIndex < numWords; secondIterIndex++) {
      if (firstIterIndex !== secondIterIndex) {
        for (let currentOverlapLength = Math.min(words[firstIterIndex].length, words[secondIterIndex].length); currentOverlapLength > 0; currentOverlapLength--) {
          if (words[firstIterIndex].slice(-currentOverlapLength) === words[secondIterIndex].slice(0, currentOverlapLength)) {
            overlapScores[firstIterIndex][secondIterIndex] = currentOverlapLength;
            break;
          }
        }
      }
    }
  }

  const dpSolutions = new Array(1 << numWords).fill().map(() => new Array(numWords).fill(''));
  for (let singleWordIndex = 0; singleWordIndex < numWords; singleWordIndex++) {
    dpSolutions[1 << singleWordIndex][singleWordIndex] = words[singleWordIndex];
  }

  for (let iterationMask = 1; iterationMask < (1 << numWords); iterationMask++) {
    for (let prevWordInMask = 0; prevWordInMask < numWords; prevWordInMask++) {
      if (!(iterationMask & (1 << prevWordInMask))) continue;
      for (let wordToAppendIdx = 0; wordToAppendIdx < numWords; wordToAppendIdx++) {
        if (iterationMask & (1 << wordToAppendIdx)) continue;
        const newCombinedMask = iterationMask | (1 << wordToAppendIdx);
        const tempCandidateString = dpSolutions[iterationMask][prevWordInMask] + words[wordToAppendIdx].slice(overlapScores[prevWordInMask][wordToAppendIdx]);
        if (dpSolutions[newCombinedMask][wordToAppendIdx] === '' || tempCandidateString.length < dpSolutions[newCombinedMask][wordToAppendIdx].length) {
          dpSolutions[newCombinedMask][wordToAppendIdx] = tempCandidateString;
        }
      }
    }
  }

  let overallResultString = dpSolutions[(1 << numWords) - 1][0];
  for (let finalResultIterator = 1; finalResultIterator < numWords; finalResultIterator++) {
    if (dpSolutions[(1 << numWords) - 1][finalResultIterator].length < overallResultString.length) {
      overallResultString = dpSolutions[(1 << numWords) - 1][finalResultIterator];
    }
  }

  return overallResultString;
};