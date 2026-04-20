/**
 * Binary Trees With Factors
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numFactoredBinaryTrees = function (inputNumbers) {
  const modulusConstant = 1e9 + 7;
  const treeCountMap = new Map();
  const numberPresenceMap = new Map();

  inputNumbers.sort(
    (firstElement, secondElement) => firstElement - secondElement,
  );

  for (
    let currentEntryIndex = 0;
    currentEntryIndex < inputNumbers.length;
    currentEntryIndex++
  ) {
    numberPresenceMap.set(inputNumbers[currentEntryIndex], true);
  }

  let overallTreeCount = 0;

  for (
    let rootCandidateIndex = 0;
    rootCandidateIndex < inputNumbers.length;
    rootCandidateIndex++
  ) {
    const currentRootValue = inputNumbers[rootCandidateIndex];
    let waysToFormCurrentRoot = 1;

    for (
      let leftFactorIndex = 0;
      leftFactorIndex < rootCandidateIndex;
      leftFactorIndex++
    ) {
      const leftChildValue = inputNumbers[leftFactorIndex];

      if (currentRootValue % leftChildValue === 0) {
        const rightChildValue = currentRootValue / leftChildValue;

        if (numberPresenceMap.has(rightChildValue)) {
          const waysLeftSubtree = treeCountMap.get(leftChildValue);
          const waysRightSubtree = treeCountMap.get(rightChildValue);
          waysToFormCurrentRoot =
            (waysToFormCurrentRoot +
              ((waysLeftSubtree * waysRightSubtree) % modulusConstant)) %
            modulusConstant;
        }
      }
    }
    treeCountMap.set(currentRootValue, waysToFormCurrentRoot);
    overallTreeCount =
      (overallTreeCount + waysToFormCurrentRoot) % modulusConstant;
  }

  return overallTreeCount;
};
