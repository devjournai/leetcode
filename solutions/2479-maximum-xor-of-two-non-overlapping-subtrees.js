/**
 * Maximum Xor Of Two Non Overlapping Subtrees
 * Intuition: Calculate subtree sums using DFS. Use a Trie (prefix tree) to efficiently find the maximum XOR pair. Traverse the tree again with DFS, performing a post-order insertion of subtree sums into the Trie and querying the Trie for max XOR values from previously processed non-overlapping subtrees.
 * Approach:
 * 1. Define a `TrieNode` class with `children` array to store pointers to 0 and 1 bits.
 * 2. Construct an adjacency list `adjGraph` from the `edgeConnections` array to represent the tree.
 * 3. Initialize an array `totalSubtreeValues` to store the sum of node values for each subtree.
 * 4. Perform a Depth First Search (`calculateNodeSubtreeSum`) starting from node 0 (root) to populate `totalSubtreeValues`. During this DFS, recursively sum up child subtree values and add the current node's value. All sums should be `BigInt`.
 * 5. Initialize an empty Trie (`trieDataStructureRoot`) for XOR calculations.
 * 6. Define an `insertValueIntoTrie` function that takes a `BigInt` value and inserts its bits into the Trie, starting from the most significant bit (e.g., 44th bit down to 0).
 * 7. Define a `queryTrieForMaxXor` function that takes a `BigInt` value (`queryValue`) and the Trie root. It traverses the Trie, at each bit position trying to take the opposite bit of `queryValue` to maximize the XOR sum. If the opposite bit path exists, it takes it; otherwise, it takes the existing path.
 * 8. Perform another Depth First Search (`findMaximumXorScore`) starting from node 0.
 *    a. In `findMaximumXorScore`, first, calculate a potential maximum XOR by querying the current `trieDataStructureRoot` with the `totalSubtreeValues` of the `currentNode`. This covers cases where one subtree is the current node's subtree and the other is a previously processed non-overlapping subtree (from an ancestor's sibling branch or a completely different part of the tree).
 *    b. Recursively call `findMaximumXorScore` for each `childNode` of the `currentNode`. Update the maximum XOR score with the results from these recursive calls. This handles cases where both subtrees are within the children's subtrees.
 *    c. After processing all children and updating the maximum score, insert `totalSubtreeValues[currentNode]` into the `trieDataStructureRoot`. This makes the current node's subtree sum available for its parent, sibling branches, or other parts of the tree for future XOR calculations.
 *    d. Return the maximum XOR score found in this subtree.
 * 9. The initial call to `findMaximumXorScore(0, -1, trieDataStructureRoot)` will return the final answer.
 * Dry Run: For n=3, edges=[[0,1],[0,2]], values=[1,2,3]
 * Initial state: nodeCount=3, edgeList=[[0,1],[0,2]], nodeValues=[1,2,3]
 * 1. TrieNode class defined.
 * 2. adjGraph:
 *    - adjGraph[0] = [1, 2]
 *    - adjGraph[1] = [0]
 *    - adjGraph[2] = [0]
 * 3. totalSubtreeValues = [null, null, null]
 * 4. calculateNodeSubtreeSum(0, -1):
 *    - currentNode = 0, parentNode = -1
 *    - totalSubtreeValues[0] = 1n
 *    - Loop for childTraversalIndex=0 (childNode=1):
 *        - childNode=1 !== parentNode=-1
 *        - totalSubtreeValues[0] += calculateNodeSubtreeSum(1, 0)
 *        - calculateNodeSubtreeSum(1, 0):
 *            - currentNode = 1, parentNode = 0
 *            - totalSubtreeValues[1] = 2n
 *            - Loop for childTraversalIndex=0 (childNode=0):
 *                - childNode=0 === parentNode=0 (skip)
 *            - returns 2n. So totalSubtreeValues[1] = 2n.
 *    - totalSubtreeValues[0] = 1n + 2n = 3n
 *    - Loop for childTraversalIndex=1 (childNode=2):
 *        - childNode=2 !== parentNode=-1
 *        - totalSubtreeValues[0] += calculateNodeSubtreeSum(2, 0)
 *        - calculateNodeSubtreeSum(2, 0):
 *            - currentNode = 2, parentNode = 0
 *            - totalSubtreeValues[2] = 3n
 *            - Loop for childTraversalIndex=0 (childNode=0):
 *                - childNode=0 === parentNode=0 (skip)
 *            - returns 3n. So totalSubtreeValues[2] = 3n.
 *    - totalSubtreeValues[0] = 3n + 3n = 6n
 *    - returns 6n.
 *    After DFS: totalSubtreeValues = [6n, 2n, 3n]
 * 5. trieDataStructureRoot = new TrieNode()
 * 6. insertValueIntoTrie defined.
 * 7. queryTrieForMaxXor defined.
 * 8. findMaximumXorScore(0, -1, trieDataStructureRoot):
 *    - currentNode = 0, parentNode = -1
 *    - maximumXorScore = queryTrieForMaxXor(trieDataStructureRoot, 6n) -> Trie is empty, returns 0n.
 *    - Loop for childIterationIndex=0 (childNode=1):
 *        - childNode=1 !== parentNode=-1
 *        - maxScoreFromChild = findMaximumXorScore(1, 0, trieDataStructureRoot):
 *            - currentNode = 1, parentNode = 0
 *            - maxScoreFromChildInNode1 = queryTrieForMaxXor(trieDataStructureRoot, 2n) -> Trie empty, returns 0n.
 *            - Loop for childIterationIndex=0 (childNode=0):
 *                - childNode=0 === parentNode=0 (skip)
 *            - After loop: maxScoreFromChildInNode1 = 0n.
 *            - insertValueIntoTrie(trieDataStructureRoot, 2n). Trie now contains 2n.
 *            - returns 0n.
 *        - maximumXorScore = max(0n, 0n) = 0n.
 *    - Loop for childIterationIndex=1 (childNode=2):
 *        - childNode=2 !== parentNode=-1
 *        - maxScoreFromChild = findMaximumXorScore(2, 0, trieDataStructureRoot):
 *            - currentNode = 2, parentNode = 0
 *            - maxScoreFromChildInNode2 = queryTrieForMaxXor(trieDataStructureRoot, 3n) -> Query 3n (011) against 2n (010). Max XOR is 1n.
 *            - Loop for childIterationIndex=0 (childNode=0):
 *                - childNode=0 === parentNode=0 (skip)
 *            - After loop: maxScoreFromChildInNode2 = 1n.
 *            - insertValueIntoTrie(trieDataStructureRoot, 3n). Trie now contains 2n, 3n.
 *            - returns 1n.
 *        - maximumXorScore = max(0n, 1n) = 1n.
 *    - After loop: maximumXorScore = 1n.
 *    - insertValueIntoTrie(trieDataStructureRoot, 6n). Trie now contains 2n, 3n, 6n.
 *    - returns 1n.
 * 9. Final return value: 1.
 * Time Complexity: O(N * B)
 * Space Complexity: O(N * B)
 */
var maxXor = function (nodeCount, edgeList, nodeValues) {
  class TrieNode {
    constructor() {
      this.children = [null, null];
    }
  }

  const adjGraph = Array(nodeCount)
    .fill()
    .map(() => []);
  for (const [firstNode, secondNode] of edgeList) {
    adjGraph[firstNode].push(secondNode);
    adjGraph[secondNode].push(firstNode);
  }

  const totalSubtreeValues = new Array(nodeCount);

  function calculateNodeSubtreeSum(currentNode, parentNode) {
    totalSubtreeValues[currentNode] = BigInt(nodeValues[currentNode]);
    for (
      let nodeConnectionIndex = 0;
      nodeConnectionIndex < adjGraph[currentNode].length;
      nodeConnectionIndex++
    ) {
      const childNode = adjGraph[currentNode][nodeConnectionIndex];
      if (childNode !== parentNode) {
        totalSubtreeValues[currentNode] += calculateNodeSubtreeSum(
          childNode,
          currentNode
        );
      }
    }
    return totalSubtreeValues[currentNode];
  }

  calculateNodeSubtreeSum(0, -1);
  const trieDataStructureRoot = new TrieNode();

  function insertValueIntoTrie(trieRootNode, currentValueForTrie) {
    let currentTrieNode = trieRootNode;
    for (
      let currentBitPosition = 44;
      currentBitPosition >= 0;
      currentBitPosition--
    ) {
      const extractedBitValue =
        (currentValueForTrie >> BigInt(currentBitPosition)) & 1n;
      const childIndex = Number(extractedBitValue);
      if (!currentTrieNode.children[childIndex]) {
        currentTrieNode.children[childIndex] = new TrieNode();
      }
      currentTrieNode = currentTrieNode.children[childIndex];
    }
  }

  function queryTrieForMaxXor(trieRootNodePointer, valueToXor) {
    if (!trieRootNodePointer.children[0] && !trieRootNodePointer.children[1]) {
      return 0n;
    }

    let maximumXorValue = 0n;
    let currentTrieNodeInGet = trieRootNodePointer;

    for (
      let bitPositionForXOR = 44;
      bitPositionForXOR >= 0;
      bitPositionForXOR--
    ) {
      const bitOfValueToXor = (valueToXor >> BigInt(bitPositionForXOR)) & 1n;
      const desiredBitToMaximize = 1n - bitOfValueToXor;
      const desiredChildIndex = Number(desiredBitToMaximize);
      const actualChildIndex = Number(bitOfValueToXor);

      if (currentTrieNodeInGet.children[desiredChildIndex]) {
        maximumXorValue += 1n << BigInt(bitPositionForXOR);
        currentTrieNodeInGet = currentTrieNodeInGet.children[desiredChildIndex];
      } else {
        currentTrieNodeInGet = currentTrieNodeInGet.children[actualChildIndex];
      }
    }
    return maximumXorValue;
  }

  function findMaximumXorScore(currentNode, parentNode, trieRootPointer) {
    let maximumXorScore = queryTrieForMaxXor(
      trieRootPointer,
      totalSubtreeValues[currentNode]
    );

    for (
      let childIterationIndex = 0;
      childIterationIndex < adjGraph[currentNode].length;
      childIterationIndex++
    ) {
      const childNode = adjGraph[currentNode][childIterationIndex];
      if (childNode !== parentNode) {
        const maxScoreFromChild = findMaximumXorScore(
          childNode,
          currentNode,
          trieRootPointer
        );
        if (maxScoreFromChild > maximumXorScore) {
          maximumXorScore = maxScoreFromChild;
        }
      }
    }

    insertValueIntoTrie(trieRootPointer, totalSubtreeValues[currentNode]);
    return maximumXorScore;
  }

  return Number(findMaximumXorScore(0, -1, trieDataStructureRoot));
};
