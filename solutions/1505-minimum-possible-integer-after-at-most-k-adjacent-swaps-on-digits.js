/**
 * Minimum Possible Integer After At Most K Adjacent Swaps On Digits
 * Time Complexity: O(N * log N)
 * Space Complexity: O(N)
 */
var minInteger = function (num, k) {
  const numChars = num.split("");
  const charCount = numChars.length;

  const bitStructure = new Array(charCount + 1).fill(0);
  const digitOriginalPositions = Array.from({ length: 10 }, () => []);
  const finalResultArray = [];

  for (let charIndex = 0; charIndex < charCount; charIndex++) {
    digitOriginalPositions[numChars[charIndex]].push(charIndex);
  }

  const bitUpdateOperation = (targetIndex) => {
    for (
      let treePointer = targetIndex + 1;
      treePointer <= charCount;
      treePointer += treePointer & -treePointer
    ) {
      bitStructure[treePointer]++;
    }
  };

  const bitFetchQuery = (queryPosition) => {
    let currentSum = 0;
    for (
      let queryTreePointer = queryPosition + 1;
      queryTreePointer > 0;
      queryTreePointer -= queryTreePointer & -queryTreePointer
    ) {
      currentSum += bitStructure[queryTreePointer];
    }
    return currentSum;
  };

  for (
    let currentOutputIndex = 0;
    currentOutputIndex < charCount;
    currentOutputIndex++
  ) {
    for (let candidateDigit = 0; candidateDigit <= 9; candidateDigit++) {
      if (digitOriginalPositions[candidateDigit].length === 0) continue;

      const originalPos = digitOriginalPositions[candidateDigit][0];
      const swapsRequired = originalPos - bitFetchQuery(originalPos);

      if (swapsRequired <= k) {
        k -= swapsRequired;
        finalResultArray.push(candidateDigit);
        bitUpdateOperation(originalPos);
        digitOriginalPositions[candidateDigit].shift();
        break;
      }
    }
  }

  return finalResultArray.join("");
};
