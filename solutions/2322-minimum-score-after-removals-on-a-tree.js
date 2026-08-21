/**
 * Minimum Score After Removals On A Tree
 * Intuition: The problem involves removing two edges to split a tree into three components and finding the minimum score based on their XOR sums. Calculating subtree XOR sums and using discovery/finish times to determine ancestor-descendant relationships allows efficient identification of the three component XORs for any pair of removed edges.
 * Approach: 1. Build an adjacency list representation of the tree. 2. Perform a Depth First Search (DFS) starting from node 0 (arbitrary root) to calculate two things for each node: its subtree XOR sum (the XOR sum of all node values in the subtree rooted at this node) and its discovery/finish times (for O(1) ancestor checks). 3. Calculate the total XOR sum of all nodes in the original tree. 4. Iterate through all distinct pairs of edges. For each pair: a. Identify the two subtrees that would be separated by removing these edges. This involves determining which node of an edge is the 'child' in the context of the DFS tree. b. Based on the ancestor-descendant relationship of these two identified subtrees, determine the XOR sums of the three resulting components. There are two main cases: one subtree is nested within the other, or they are disjoint. c. Calculate the score as the difference between the maximum and minimum XOR sums of the three components. d. Update the overall minimum score found so far. 5. Return the minimum score.
 * Dry Run:
 * nums = [1,5,2,10], edges = [[0,1],[1,2],[1,3]]
 * n = 4
 * adjacencyList:
 * 0: [1]
 * 1: [0,2,3]
 * 2: [1]
 * 3: [1]
 *
 * overallXorSum = 1^5^2^10 = 12
 *
 * DFS (from 0, -1):
 * Calls:
 * dfs(0, -1)
 *   discoveryTimes[0] = 0, globalTimer = 1
 *   nodeSubtreeXorValues[0] = nums[0] = 1
 *   dfs(1, 0)
 *     discoveryTimes[1] = 1, globalTimer = 2
 *     nodeSubtreeXorValues[1] = nums[1] = 5
 *     dfs(2, 1)
 *       discoveryTimes[2] = 2, globalTimer = 3
 *       nodeSubtreeXorValues[2] = nums[2] = 2
 *       finishTimes[2] = 3, globalTimer = 4
 *     nodeSubtreeXorValues[1] ^= nodeSubtreeXorValues[2] (5^2=7)
 *     dfs(3, 1)
 *       discoveryTimes[3] = 4, globalTimer = 5
 *       nodeSubtreeXorValues[3] = nums[3] = 10
 *       finishTimes[3] = 5, globalTimer = 6
 *     nodeSubtreeXorValues[1] ^= nodeSubtreeXorValues[3] (7^10=13)
 *     finishTimes[1] = 6, globalTimer = 7
 *   nodeSubtreeXorValues[0] ^= nodeSubtreeXorValues[1] (1^13=12)
 *   finishTimes[0] = 7, globalTimer = 8
 *
 * Results after DFS:
 * nodeSubtreeXorValues: [12, 13, 2, 10] (for nodes 0, 1, 2, 3 respectively)
 * discoveryTimes: [0, 1, 2, 4]
 * finishTimes: [7, 6, 3, 5]
 *
 * checkAncestor(a, b): discoveryTimes[a] <= discoveryTimes[b] && finishTimes[a] >= finishTimes[b]
 * Example: checkAncestor(0, 2) -> T[0]=0 <= T[2]=2 && F[0]=7 >= F[2]=3 -> true (0 is ancestor of 2)
 * Example: checkAncestor(2, 0) -> T[2]=2 <= T[0]=0 -> false (2 is not ancestor of 0)
 * Example: checkAncestor(2, 3) -> T[2]=2 <= T[3]=4 && F[2]=3 >= F[3]=5 -> false (neither)
 *
 * Initial minimumOverallScore = Infinity
 *
 * Edges: [[0,1],[1,2],[1,3]] (n-1 = 3 edges)
 *
 * Loop edgeIndexOne = 0, edgeIndexTwo = 1
 * currentEdgePairOne = [0,1], currentEdgePairTwo = [1,2]
 *
 * For currentEdgePairOne [0,1]:
 *   checkAncestor(0,1) -> true. removedSubtreeRootOne = 1.
 *   xorValueSubtreeOne = nodeSubtreeXorValues[1] = 13
 *
 * For currentEdgePairTwo [1,2]:
 *   checkAncestor(1,2) -> true. removedSubtreeRootTwo = 2.
 *   xorValueSubtreeTwo = nodeSubtreeXorValues[2] = 2
 *
 * Check relationship between removedSubtreeRootOne (1) and removedSubtreeRootTwo (2):
 *   checkAncestor(1,2) -> true (1 is ancestor of 2) -> Nested case
 *   xorComponentA = xorValueSubtreeTwo = 2
 *   xorComponentB = xorValueSubtreeOne ^ xorComponentA = 13 ^ 2 = 15
 *   xorComponentC = overallXorSum ^ xorValueSubtreeOne = 12 ^ 13 = 1
 *
 *   Components: [2, 15, 1]
 *   maximumComponentXor = 15
 *   minimumComponentXor = 1
 *   score = 15 - 1 = 14
 *   minimumOverallScore = min(Infinity, 14) = 14
 *
 * Loop edgeIndexOne = 0, edgeIndexTwo = 2
 * currentEdgePairOne = [0,1], currentEdgePairTwo = [1,3]
 *   removedSubtreeRootOne = 1, xorValueSubtreeOne = 13 (same as above)
 *
 * For currentEdgePairTwo [1,3]:
 *   checkAncestor(1,3) -> true. removedSubtreeRootTwo = 3.
 *   xorValueSubtreeTwo = nodeSubtreeXorValues[3] = 10
 *
 * Check relationship between removedSubtreeRootOne (1) and removedSubtreeRootTwo (3):
 *   checkAncestor(1,3) -> true (1 is ancestor of 3) -> Nested case
 *   xorComponentA = xorValueSubtreeTwo = 10
 *   xorComponentB = xorValueSubtreeOne ^ xorComponentA = 13 ^ 10 = 7
 *   xorComponentC = overallXorSum ^ xorValueSubtreeOne = 12 ^ 13 = 1
 *
 *   Components: [10, 7, 1]
 *   maximumComponentXor = 10
 *   minimumComponentXor = 1
 *   score = 10 - 1 = 9
 *   minimumOverallScore = min(14, 9) = 9
 *
 * Loop edgeIndexOne = 1, edgeIndexTwo = 2
 * currentEdgePairOne = [1,2], currentEdgePairTwo = [1,3]
 *   removedSubtreeRootOne = 2, xorValueSubtreeOne = 2
 *   removedSubtreeRootTwo = 3, xorValueSubtreeTwo = 10
 *
 * Check relationship between removedSubtreeRootOne (2) and removedSubtreeRootTwo (3):
 *   checkAncestor(2,3) -> discoveryTimes[2]=2 <= discoveryTimes[3]=4 && finishTimes[2]=3 >= finishTimes[3]=5 -> false
 *   checkAncestor(3,2) -> discoveryTimes[3]=4 <= discoveryTimes[2]=2 -> false
 *   -> Disjoint case
 *   xorComponentA = xorValueSubtreeOne = 2
 *   xorComponentB = xorValueSubtreeTwo = 10
 *   xorComponentC = overallXorSum ^ xorComponentA ^ xorComponentB = 12 ^ 2 ^ 10 = 0
 *
 *   Components: [2, 10, 0]
 *   maximumComponentXor = 10
 *   minimumComponentXor = 0
 *   score = 10 - 0 = 10
 *   minimumOverallScore = min(9, 10) = 9
 *
 * Final Result: 9
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var minimumScore = function (nums, edges) {
  const nodeCount = nums.length;
  const adjacencyList = Array.from({ length: nodeCount }, () => []);

  for (const currentEdge of edges) {
    const firstNode = currentEdge[0];
    const secondNode = currentEdge[1];
    adjacencyList[firstNode].push(secondNode);
    adjacencyList[secondNode].push(firstNode);
  }

  let overallXorSum = 0;
  for (const numValue of nums) {
    overallXorSum ^= numValue;
  }

  const nodeSubtreeXorValues = new Array(nodeCount).fill(0);
  const discoveryTimes = new Array(nodeCount);
  const finishTimes = new Array(nodeCount);
  let globalTimer = 0;

  const dfsTraversal = (currentNode, parentNode) => {
    discoveryTimes[currentNode] = globalTimer++;
    nodeSubtreeXorValues[currentNode] = nums[currentNode];

    for (const adjacentNode of adjacencyList[currentNode]) {
      if (adjacentNode !== parentNode) {
        dfsTraversal(adjacentNode, currentNode);
        nodeSubtreeXorValues[currentNode] ^= nodeSubtreeXorValues[adjacentNode];
      }
    }

    finishTimes[currentNode] = globalTimer++;
  };

  dfsTraversal(0, -1);

  const checkAncestor = (possibleAncestor, possibleDescendant) => {
    return (
      discoveryTimes[possibleAncestor] <= discoveryTimes[possibleDescendant] &&
      finishTimes[possibleAncestor] >= finishTimes[possibleDescendant]
    );
  };

  let minimumOverallScore = Infinity;
  const nodeCountMinusOne = nodeCount - 1;

  for (let edgeIndexOne = 0; edgeIndexOne < nodeCountMinusOne; edgeIndexOne++) {
    for (
      let edgeIndexTwo = edgeIndexOne + 1;
      edgeIndexTwo < nodeCountMinusOne;
      edgeIndexTwo++
    ) {
      const currentEdgePairOne = edges[edgeIndexOne];
      const currentEdgePairTwo = edges[edgeIndexTwo];

      let removedSubtreeRootOne;
      if (checkAncestor(currentEdgePairOne[0], currentEdgePairOne[1])) {
        removedSubtreeRootOne = currentEdgePairOne[1];
      } else {
        removedSubtreeRootOne = currentEdgePairOne[0];
      }
      const xorValueSubtreeOne = nodeSubtreeXorValues[removedSubtreeRootOne];

      let removedSubtreeRootTwo;
      if (checkAncestor(currentEdgePairTwo[0], currentEdgePairTwo[1])) {
        removedSubtreeRootTwo = currentEdgePairTwo[1];
      } else {
        removedSubtreeRootTwo = currentEdgePairTwo[0];
      }
      const xorValueSubtreeTwo = nodeSubtreeXorValues[removedSubtreeRootTwo];

      let xorComponentA;
      let xorComponentB;
      let xorComponentC;

      if (checkAncestor(removedSubtreeRootOne, removedSubtreeRootTwo)) {
        xorComponentA = xorValueSubtreeTwo;
        xorComponentB = xorValueSubtreeOne ^ xorComponentA;
        xorComponentC = overallXorSum ^ xorValueSubtreeOne;
      } else if (checkAncestor(removedSubtreeRootTwo, removedSubtreeRootOne)) {
        xorComponentA = xorValueSubtreeOne;
        xorComponentB = xorValueSubtreeTwo ^ xorComponentA;
        xorComponentC = overallXorSum ^ xorValueSubtreeTwo;
      } else {
        xorComponentA = xorValueSubtreeOne;
        xorComponentB = xorValueSubtreeTwo;
        xorComponentC = overallXorSum ^ xorComponentA ^ xorComponentB;
      }

      const valuesArray = [xorComponentA, xorComponentB, xorComponentC];
      const maximumComponentXor = Math.max(...valuesArray);
      const minimumComponentXor = Math.min(...valuesArray);

      minimumOverallScore = Math.min(
        minimumOverallScore,
        maximumComponentXor - minimumComponentXor
      );
    }
  }

  return minimumOverallScore;
};
