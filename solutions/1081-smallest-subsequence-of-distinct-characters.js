/**
 * Smallest Subsequence Of Distinct Characters
 * Intuition: The lexicographically smallest distinct subsequence is built with a stack: greedy pop a larger last letter when it still appears later, so each character is used once as early as its last copy allows.
 * Approach: 1. Record last index of every char. 2. Scan left to right; skip chars already in the stack. 3. While the top is > current and still appears later, pop it. 4. Push current. 5. Join the stack.
 * Dry Run: s=bcabc. Stack b,c then pops both for a (they appear later), then b,c → abc.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var smallestSubsequence = function (inputString) {
  const lastIndexPositions = new Map();
  for (let loopIndex = 0; loopIndex < inputString.length; loopIndex++) {
    lastIndexPositions.set(inputString[loopIndex], loopIndex);
  }

  const processingStack = [];
  const charactersVisited = new Set();

  for (
    let currentScanIndex = 0;
    currentScanIndex < inputString.length;
    currentScanIndex++
  ) {
    const charFromInput = inputString[currentScanIndex];

    if (charactersVisited.has(charFromInput)) {
      continue;
    }

    while (
      processingStack.length > 0 &&
      processingStack[processingStack.length - 1] > charFromInput &&
      lastIndexPositions.get(processingStack[processingStack.length - 1]) >
        currentScanIndex
    ) {
      const stackTopChar = processingStack.pop();
      charactersVisited.delete(stackTopChar);
    }

    processingStack.push(charFromInput);
    charactersVisited.add(charFromInput);
  }

  return processingStack.join("");
};
