/**
 * Maximum Genetic Difference Query
 * Intuition: For query `(node, val)` we want `max val XOR ancestor` including the node. A binary trie of values on the root-to-node path, updated during DFS (insert on enter, erase on leave), answers max XOR in O(bit width).
 * Approach: 1. Build the tree from `parents` and group queries by node. 2. Insert/remove 18-bit values in a trie with occupancy counts. 3. `trieQuery` prefers the opposite bit at each level. 4. DFS from the root: insert node, answer its queries, recurse children, then remove.
 * Dry Run: parents = [-1,0,1], queries = [[0,2]] (val=2, node=0).
 *   - Trie has only 0; 2 XOR 0 = 2. Answer [2].
 * Time Complexity: O((N + Q) * log N)
 * Space Complexity: O(N * log N + Q)
 */
var maxGeneticDifference = function (parents, queries) {
  const nodeCount = parents.length;
  const adjacencyList = Array(nodeCount)
    .fill()
    .map(() => []);
  let treeRoot = -1;

  for (let parentIdx = 0; parentIdx < nodeCount; parentIdx++) {
    if (parents[parentIdx] === -1) {
      treeRoot = parentIdx;
    } else {
      adjacencyList[parents[parentIdx]].push(parentIdx);
    }
  }

  const trieRootNode = { nodeCountTracker: 0, childrenMap: {} };
  const queriesByNode = Array(nodeCount)
    .fill()
    .map(() => []);
  const finalAnswers = new Array(queries.length).fill(0);
  const maxBitPosition = 17;

  for (
    let currentQueryIndex = 0;
    currentQueryIndex < queries.length;
    currentQueryIndex++
  ) {
    const queryEntry = queries[currentQueryIndex];
    const queryNode = queryEntry[0];
    const queryValue = queryEntry[1];
    queriesByNode[queryNode].push([queryValue, currentQueryIndex]);
  }

  function trieInsert(valueToInsert) {
    let currentTrieNode = trieRootNode;
    for (
      let bitPositionIterator = maxBitPosition;
      bitPositionIterator >= 0;
      bitPositionIterator--
    ) {
      const currentBitValue = (valueToInsert >> bitPositionIterator) & 1;
      if (!currentTrieNode.childrenMap[currentBitValue]) {
        currentTrieNode.childrenMap[currentBitValue] = {
          nodeCountTracker: 0,
          childrenMap: {},
        };
      }
      currentTrieNode = currentTrieNode.childrenMap[currentBitValue];
      currentTrieNode.nodeCountTracker++;
    }
  }

  function trieRemove(valueToRemove) {
    let currentRemovalNode = trieRootNode;
    for (
      let bitPositionRemover = maxBitPosition;
      bitPositionRemover >= 0;
      bitPositionRemover--
    ) {
      const bitValueForRemoval = (valueToRemove >> bitPositionRemover) & 1;
      currentRemovalNode = currentRemovalNode.childrenMap[bitValueForRemoval];
      currentRemovalNode.nodeCountTracker--;
    }
  }

  function trieQuery(queryValue) {
    let querySearchNode = trieRootNode;
    let maximumXorResult = 0;
    for (
      let queryBitIterator = maxBitPosition;
      queryBitIterator >= 0;
      queryBitIterator--
    ) {
      const currentQueryBit = (queryValue >> queryBitIterator) & 1;
      const preferredChildKey = 1 - currentQueryBit;
      const alternativeChildKey = currentQueryBit;

      if (
        querySearchNode.childrenMap[preferredChildKey]?.nodeCountTracker > 0
      ) {
        maximumXorResult |= 1 << queryBitIterator;
        querySearchNode = querySearchNode.childrenMap[preferredChildKey];
      } else if (
        querySearchNode.childrenMap[alternativeChildKey]?.nodeCountTracker > 0
      ) {
        querySearchNode = querySearchNode.childrenMap[alternativeChildKey];
      } else {
        return maximumXorResult;
      }
    }
    return maximumXorResult;
  }

  function depthFirstSearch(currentTreeNode) {
    trieInsert(currentTreeNode);

    for (const [queryOperand, queryResultIndex] of queriesByNode[
      currentTreeNode
    ]) {
      finalAnswers[queryResultIndex] = trieQuery(queryOperand);
    }

    for (const childNodeTraveler of adjacencyList[currentTreeNode]) {
      depthFirstSearch(childNodeTraveler);
    }

    trieRemove(currentTreeNode);
  }

  depthFirstSearch(treeRoot);
  return finalAnswers;
};
