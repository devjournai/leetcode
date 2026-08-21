/**
 * Minimum Possible Integer After At Most K Adjacent Swaps On Digits
 * Intuition: Greedy: at each output slot take the smallest digit whose remaining left-swap cost is ≤ k. A Fenwick tree counts digits already taken left of an original index.
 * Approach: 1. Queue original indices per digit 0-9. 2. cost = pos - BIT.query(pos). 3. If cost≤k, spend it, append the digit, mark pos taken. 4. Join digits.
 * Dry Run: num = "4321", k = 4.
 *   - Digit 1 at pos 3 costs 3; spend k=1 remaining and greedy-fill → "1342".
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
