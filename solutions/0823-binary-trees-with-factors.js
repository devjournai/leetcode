/**
 * Binary Trees With Factors
 * Intuition: After sorting, a value r can be root iff some smaller factor L exists and R=r/L is in the set; ways(r) = 1 (leaf) plus ways(L)*ways(R) for each such pair.
 * Approach: 1. Sort; mark presence. 2. For each root, start ways=1; for each smaller L dividing r, if R in map add product of ways mod 1e9+7. 3. Store and accumulate totals.
 * Dry Run: [2,4]. 2 has 1 way; 4 has 1 + ways(2)*ways(2) = 2. Total 3.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var numFactoredBinaryTrees = function (inputNumbers) {
  const modulusConstant = 1e9 + 7;
  const treeCountMap = new Map();
  const numberPresenceMap = new Map();

  inputNumbers.sort(
    (firstElement, secondElement) => firstElement - secondElement
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
