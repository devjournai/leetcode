/**
 * Create Maximum Number
 * Intuition: The k-digit answer is a merge of the largest i-digit subsequence of nums1 and (k - i)-digit subsequence of nums2. Try every valid i and keep the lexicographically largest merge.
 * Approach: 1. If k is 0, return []. 2. extractMaxSubsequence drops smaller digits while drops remain, then slices to the desired length. 3. mergeSubsequences always takes the larger remaining suffix (lex compare). 4. For i from max(0, k - n2) to min(k, n1), merge and keep the better result.
 * Dry Run: nums1 = [6, 7], nums2 = [6, 0, 4], k = 5.
 *   - Only i = 2, j = 3: subsequences [6, 7] and [6, 0, 4].
 *   - Merge by suffix compare → [6, 7, 6, 0, 4].
 * Time Complexity: O((M + N) * K^2)
 * Space Complexity: O((M + N) * K)
 */
var maxNumber = function (nums1, nums2, k) {
  const lengthOfNums1 = nums1.length;
  const lengthOfNums2 = nums2.length;
  let maxResultArray;

  if (k === 0) {
    return [];
  }

  maxResultArray = new Array(k).fill(0);

  const compareLexicographically = (firstArray, secondArray) => {
    let pointerAlpha = 0;
    let pointerBeta = 0;
    const limitAlpha = firstArray.length;
    const limitBeta = secondArray.length;

    while (pointerAlpha < limitAlpha && pointerBeta < limitBeta) {
      if (firstArray[pointerAlpha] > secondArray[pointerBeta]) {
        return 1;
      }
      if (firstArray[pointerAlpha] < secondArray[pointerBeta]) {
        return -1;
      }
      pointerAlpha++;
      pointerBeta++;
    }

    if (pointerAlpha < limitAlpha) return 1;
    if (pointerBeta < limitBeta) return -1;
    return 0;
  };

  const extractMaxSubsequence = (inputDigitsArray, desiredLength) => {
    const sequenceStack = [];
    let dropsAllowed = inputDigitsArray.length - desiredLength;
    let currentInputIdx = 0;

    while (currentInputIdx < inputDigitsArray.length) {
      const digitVal = inputDigitsArray[currentInputIdx];
      while (
        sequenceStack.length > 0 &&
        sequenceStack[sequenceStack.length - 1] < digitVal &&
        dropsAllowed > 0
      ) {
        sequenceStack.pop();
        dropsAllowed--;
      }
      sequenceStack.push(digitVal);
      currentInputIdx++;
    }

    return sequenceStack.slice(0, desiredLength);
  };

  const mergeSubsequences = (firstSubsequence, secondSubsequence) => {
    const mergedOutput = [];
    let indexA = 0;
    let indexB = 0;
    const lenA = firstSubsequence.length;
    const lenB = secondSubsequence.length;

    while (indexA < lenA || indexB < lenB) {
      let sourceToPickFrom;
      if (indexA < lenA && indexB < lenB) {
        sourceToPickFrom =
          compareLexicographically(
            firstSubsequence.slice(indexA),
            secondSubsequence.slice(indexB)
          ) >= 0
            ? firstSubsequence
            : secondSubsequence;
      } else if (indexA < lenA) {
        sourceToPickFrom = firstSubsequence;
      } else {
        sourceToPickFrom = secondSubsequence;
      }

      if (sourceToPickFrom === firstSubsequence) {
        mergedOutput.push(firstSubsequence[indexA]);
        indexA++;
      } else {
        mergedOutput.push(secondSubsequence[indexB]);
        indexB++;
      }
    }
    return mergedOutput;
  };

  for (
    let subsequenceLength1 = Math.max(0, k - lengthOfNums2);
    subsequenceLength1 <= Math.min(k, lengthOfNums1);
    subsequenceLength1++
  ) {
    const subsequenceLength2 = k - subsequenceLength1;

    const firstSubsequenceFound = extractMaxSubsequence(
      nums1,
      subsequenceLength1
    );
    const secondSubsequenceFound = extractMaxSubsequence(
      nums2,
      subsequenceLength2
    );

    const currentCombinedResult = mergeSubsequences(
      firstSubsequenceFound,
      secondSubsequenceFound
    );

    if (compareLexicographically(currentCombinedResult, maxResultArray) > 0) {
      maxResultArray = currentCombinedResult;
    }
  }

  return maxResultArray;
};
