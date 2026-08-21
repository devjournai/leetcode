/**
 * Count Pairs With Xor In A Range
 * Intuition: Count pairs with XOR ≤ high minus pairs with XOR ≤ low-1. A binary trie of inserted numbers, walking limit bits, counts how many existing values XOR to a value below the threshold.
 * Approach: 1. Insert numbers bit-by-bit (bit 14..0) into `TrieNodeDefinition` with `totalPathCount`. 2. `queryTrieForXorCount` follows the limit bits, adding whole subtrees when the limit bit is 1. 3. For each number, add query(high)-query(low-1) then insert. 4. Return `totalNicePairs`.
 * Dry Run: nums = [1,4,2,7], low=2, high=6.
 *   - Valid XOR pairs: (1,4)=5, (1,2)=3, (1,7)=6, (4,2)=6. Count 4.
 * Time Complexity: O(N * MaxBits)
 * Space Complexity: O(N * MaxBits)
 */
class TrieNodeDefinition {
  constructor() {
    this.childRefs = [null, null];
    this.totalPathCount = 0;
  }
}

function insertIntoTrie(incomingNumericValue, trieStartNode) {
  let currentIterationNode = trieStartNode;
  for (let currentBitIdx = 14; currentBitIdx >= 0; currentBitIdx--) {
    const extractedBitVal = (incomingNumericValue >> currentBitIdx) & 1;
    if (!currentIterationNode.childRefs[extractedBitVal]) {
      currentIterationNode.childRefs[extractedBitVal] =
        new TrieNodeDefinition();
    }
    currentIterationNode = currentIterationNode.childRefs[extractedBitVal];
    currentIterationNode.totalPathCount++;
  }
}

function queryTrieForXorCount(
  targetNumericValue,
  xorLimitThreshold,
  searchTrieEntry
) {
  if (xorLimitThreshold < 0) {
    return 0;
  }

  let foundPairCount = 0;
  let currentTraversalNode = searchTrieEntry;

  for (
    let currentBitDepth = 14;
    currentBitDepth >= 0 && currentTraversalNode;
    currentBitDepth--
  ) {
    const queryValueBit = (targetNumericValue >> currentBitDepth) & 1;
    const limitBitValue = (xorLimitThreshold >> currentBitDepth) & 1;

    if (limitBitValue === 0) {
      currentTraversalNode = currentTraversalNode.childRefs[queryValueBit];
    } else {
      if (currentTraversalNode.childRefs[queryValueBit]) {
        foundPairCount +=
          currentTraversalNode.childRefs[queryValueBit].totalPathCount;
      }
      currentTraversalNode = currentTraversalNode.childRefs[queryValueBit ^ 1];
    }
  }
  return (
    foundPairCount +
    (currentTraversalNode ? currentTraversalNode.totalPathCount : 0)
  );
}

var countPairs = function (nums, low, high) {
  const trieRootElement = new TrieNodeDefinition();
  let totalNicePairs = 0;

  for (const iterationValue of nums) {
    totalNicePairs +=
      queryTrieForXorCount(iterationValue, high, trieRootElement) -
      queryTrieForXorCount(iterationValue, low - 1, trieRootElement);
    insertIntoTrie(iterationValue, trieRootElement);
  }

  return totalNicePairs;
};
