/**
 * Maximum Xor With An Element From Array
 * Intuition: For query (x, m) we want max x XOR nums[i] with nums[i] ≤ m. Sort nums and queries by m, insert eligible numbers into a binary trie, then greedily take opposite bits of x.
 * Approach: 1. Sort `nums`; index-sort queries by limit. 2. Insert nums ≤ `queryLimit` into `trieRootNode` (bits 30..0). 3. If trie empty, leave -1; else walk preferring `desiredOppositeBit` to build `currentMaxXorResult`. 4. Write `finalResults[originalIndex]`.
 * Dry Run: nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]
 * (3,1): insert 0,1 → max 3⊕0=3. (1,3): insert 2,3 → max 1⊕2=3. (5,6): insert 4 → max 5⊕2=7.
 * Time Complexity: O(N log N + Q log Q + (N + Q) * M)
 * Space Complexity: O(N * M + Q)
 */
var maximizeXor = function (nums, queries) {
  nums.sort((alpha, beta) => alpha - beta);

  const indexedQueries = queries.map((queryPair, queryIdx) => [
    queryPair[0],
    queryPair[1],
    queryIdx,
  ]);
  indexedQueries.sort(
    (firstQuery, secondQuery) => firstQuery[1] - secondQuery[1]
  );

  const finalResults = new Array(queries.length).fill(-1);

  const trieRootNode = {};
  let numPointer = 0;
  const maxBitIdentifier = 30;

  for (const queryData of indexedQueries) {
    const queryTarget = queryData[0];
    const queryLimit = queryData[1];
    const queryOriginalIndex = queryData[2];

    while (numPointer < nums.length && nums[numPointer] <= queryLimit) {
      let currentNodeForInsertion = trieRootNode;
      for (
        let bitIterator = maxBitIdentifier;
        bitIterator >= 0;
        bitIterator--
      ) {
        const currentBitValue = (nums[numPointer] >> bitIterator) & 1;
        if (!currentNodeForInsertion[currentBitValue]) {
          currentNodeForInsertion[currentBitValue] = {};
        }
        currentNodeForInsertion = currentNodeForInsertion[currentBitValue];
      }
      numPointer++;
    }

    if (Object.keys(trieRootNode).length === 0 && numPointer === 0) {
      continue;
    }

    let currentMaxXorResult = 0;
    let queryTraversalNode = trieRootNode;
    for (let bitPosition = maxBitIdentifier; bitPosition >= 0; bitPosition--) {
      const currentQueryBit = (queryTarget >> bitPosition) & 1;
      const desiredOppositeBit = currentQueryBit ^ 1;

      if (queryTraversalNode[desiredOppositeBit]) {
        currentMaxXorResult |= 1 << bitPosition;
        queryTraversalNode = queryTraversalNode[desiredOppositeBit];
      } else {
        queryTraversalNode = queryTraversalNode[currentQueryBit];
      }
    }
    finalResults[queryOriginalIndex] = currentMaxXorResult;
  }

  return finalResults;
};
