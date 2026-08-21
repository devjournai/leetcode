/**
 * Number Of Good Paths
 * Intuition: Good paths require all intermediate nodes to have values less than or equal to the start/end nodes. This suggests processing nodes in increasing order of their values. A Disjoint Set Union (DSU) structure can efficiently track connected components formed by nodes whose values are within the current maximum allowed value.
 * Approach: 1. Initialize a DSU data structure (parent and rank arrays) for 'n' nodes. 2. Build an adjacency list representation of the tree from the given edges. 3. Group nodes by their values using a Map, where keys are values and entries are lists of node indices. 4. Sort the unique values in ascending order. 5. Iterate through each unique value: For all nodes having this value, iterate their neighbors. If a neighbor's value is less than or equal to the current value, unite the current node and its neighbor in the DSU. This merges components that can form valid paths up to the current value. 6. After processing all neighbors for nodes of the current value, count how many nodes with the current value fall into each DSU component. If a component has 'k' nodes of the current value, then 'k * (k + 1) / 2' new good paths are formed (this includes the 'k' single-node paths and 'k choose 2' paths between distinct endpoints of the current value). 7. Sum these counts to get the total number of good paths.
 * Dry Run:
 * vals = [1,3,2,1,3], edges = [[0,1],[1,2],[2,3],[3,4]]
 * n = 5
 *
 * 1. DSU Init: parentArray = [-1,-1,-1,-1,-1], rankArray = [0,0,0,0,0]
 * 2. Adjacency List:
 *    adjList[0] = [1]
 *    adjList[1] = [0,2]
 *    adjList[2] = [1,3]
 *    adjList[3] = [2,4]
 *    adjList[4] = [3]
 * 3. Nodes by Value:
 *    nodesGroupedByValue = {1: [0,3], 2: [2], 3: [1,4]}
 * 4. Sorted Values: distinctValues = [1,2,3]
 * 5. totalGoodPaths = 0
 *
 * Iteration 1: currentValueForProcessing = 1
 *   nodesWithCurrentValue = [0,3]
 *   - node 0 (val 1): neighbor 1 (val 3). vals[1] > 1, skip.
 *   - node 3 (val 1): neighbor 2 (val 2). vals[2] > 1, skip.
 *   Root Counts for [0,3]:
 *     findSetRepresentative(0) -> 0. rootComponentCounts = {0:1}
 *     findSetRepresentative(3) -> 3. rootComponentCounts = {3:1}
 *   Update totalGoodPaths:
 *     count=1 (for root 0): totalGoodPaths += (1 * 2) / 2 = 1. totalGoodPaths = 1.
 *     count=1 (for root 3): totalGoodPaths += (1 * 2) / 2 = 1. totalGoodPaths = 2.
 *   (Paths: [0], [3])
 *
 * Iteration 2: currentValueForProcessing = 2
 *   nodesWithCurrentValue = [2]
 *   - node 2 (val 2):
 *     - neighbor 1 (val 3). vals[1] > 2, skip.
 *     - neighbor 3 (val 1). vals[3] <= 2. uniteDisjointSets(2,3).
 *       findSetRepresentative(2) = 2, findSetRepresentative(3) = 3.
 *       parentArray[3] = 2. rankArray[2] = 1.
 *       (parentArray = [-1,-1,-1,2,-1], rankArray = [0,0,1,0,0])
 *   Root Counts for [2]:
 *     findSetRepresentative(2) -> 2. rootComponentCounts = {2:1}
 *   Update totalGoodPaths:
 *     count=1 (for root 2): totalGoodPaths += (1 * 2) / 2 = 1. totalGoodPaths = 3.
 *   (Paths: [0], [3], [2])
 *
 * Iteration 3: currentValueForProcessing = 3
 *   nodesWithCurrentValue = [1,4]
 *   - node 1 (val 3):
 *     - neighbor 0 (val 1). vals[0] <= 3. uniteDisjointSets(1,0).
 *       findSetRepresentative(1) = 1, findSetRepresentative(0) = 0.
 *       parentArray[0] = 1. rankArray[1] = 1.
 *       (parentArray = [1,-1,-1,2,-1], rankArray = [0,1,1,0,0])
 *     - neighbor 2 (val 2). vals[2] <= 3. uniteDisjointSets(1,2).
 *       findSetRepresentative(1) = 1, findSetRepresentative(2) = 2.
 *       parentArray[2] = 1. rankArray[1] = 2.
 *       (parentArray = [1,-1,1,2,-1], rankArray = [0,2,1,0,0])
 *   - node 4 (val 3):
 *     - neighbor 3 (val 1). vals[3] <= 3. uniteDisjointSets(4,3).
 *       findSetRepresentative(4) = 4.
 *       findSetRepresentative(3) = findSetRepresentative(parentArray[3]=2) = findSetRepresentative(parentArray[2]=1) = 1.
 *       parentArray[4] = 1.
 *       (parentArray = [1,-1,1,2,1], rankArray = [0,2,1,0,0] -- DSU structure is now: 0->1, 2->1, 3->2->1, 4->1, 1 is root)
 *   Root Counts for [1,4]:
 *     findSetRepresentative(1) -> 1. rootComponentCounts = {1:1}
 *     findSetRepresentative(4) -> 1. rootComponentCounts = {1:2}
 *   Update totalGoodPaths:
 *     count=2 (for root 1): totalGoodPaths += (2 * 3) / 2 = 3. totalGoodPaths = 6.
 *   (Paths: [0], [3], [2], [1], [4], [1,4] - where path [1,4] is 1-2-3-4, intermediate values 2,1 are <= 3)
 * Final totalGoodPaths = 6.
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var numberOfGoodPaths = function (vals, edges) {
  const totalNodes = vals.length;
  const adjacencyList = Array.from({ length: totalNodes }, () => []);

  for (const [firstNodeIndex, secondNodeIndex] of edges) {
    adjacencyList[firstNodeIndex].push(secondNodeIndex);
    adjacencyList[secondNodeIndex].push(firstNodeIndex);
  }

  const parentArray = new Array(totalNodes).fill(-1);
  const rankArray = new Array(totalNodes).fill(0);

  const findSetRepresentative = (nodeIdentifier) => {
    if (parentArray[nodeIdentifier] === -1) {
      return nodeIdentifier;
    }
    parentArray[nodeIdentifier] = findSetRepresentative(
      parentArray[nodeIdentifier]
    );
    return parentArray[nodeIdentifier];
  };

  const uniteDisjointSets = (nodeIdentifierOne, nodeIdentifierTwo) => {
    let rootOne = findSetRepresentative(nodeIdentifierOne);
    let rootTwo = findSetRepresentative(nodeIdentifierTwo);

    if (rootOne === rootTwo) {
      return;
    }

    if (rankArray[rootOne] < rankArray[rootTwo]) {
      [rootOne, rootTwo] = [rootTwo, rootOne];
    }
    parentArray[rootTwo] = rootOne;
    if (rankArray[rootOne] === rankArray[rootTwo]) {
      rankArray[rootOne]++;
    }
  };

  const nodesGroupedByValue = new Map();
  for (
    let nodeIterationIndex = 0;
    nodeIterationIndex < totalNodes;
    nodeIterationIndex++
  ) {
    const nodeValue = vals[nodeIterationIndex];
    if (!nodesGroupedByValue.has(nodeValue)) {
      nodesGroupedByValue.set(nodeValue, []);
    }
    nodesGroupedByValue.get(nodeValue).push(nodeIterationIndex);
  }

  let totalGoodPaths = 0;
  const distinctValues = [...nodesGroupedByValue.keys()].sort(
    (valA, valB) => valA - valB
  );

  for (const currentValueForProcessing of distinctValues) {
    const nodesWithCurrentValue = nodesGroupedByValue.get(
      currentValueForProcessing
    );

    for (const currentNodeIndex of nodesWithCurrentValue) {
      for (const neighborNodeIndex of adjacencyList[currentNodeIndex]) {
        if (vals[neighborNodeIndex] <= currentValueForProcessing) {
          uniteDisjointSets(currentNodeIndex, neighborNodeIndex);
        }
      }
    }

    const rootComponentCounts = new Map();
    for (const nodeConsidered of nodesWithCurrentValue) {
      const componentRoot = findSetRepresentative(nodeConsidered);
      rootComponentCounts.set(
        componentRoot,
        (rootComponentCounts.get(componentRoot) || 0) + 1
      );
    }

    for (const componentNodeCount of rootComponentCounts.values()) {
      totalGoodPaths += (componentNodeCount * (componentNodeCount + 1)) / 2;
    }
  }

  return totalGoodPaths;
};
