/**
 * Maximum Xor With An Element From Array
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
    (firstQuery, secondQuery) => firstQuery[1] - secondQuery[1],
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
