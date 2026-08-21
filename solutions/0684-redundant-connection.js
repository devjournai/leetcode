/**
 * Redundant Connection
 * Intuition: An undirected tree plus one extra edge has a cycle. Union-Find: the first edge whose endpoints already share a root is the redundant one.
 * Approach: 1. Init `parentArray`/`rankArray` for nodes 1..n. 2. `findRoot` with path compression. 3. `combineSets` by rank; return false if already united. 4. Process edges; return the first that fails union.
 * Dry Run: edges=[[1,2],[1,3],[2,3]]. Union 1-2, 1-3; 2 and 3 already same root → return [2,3].
 * Time Complexity: O(N*α(N))
 * Space Complexity: O(N)
 */
var findRedundantConnection = function (edges) {
  const numberOfNodes = edges.length;

  const parentArray = new Array(numberOfNodes + 1);
  const rankArray = new Array(numberOfNodes + 1);

  for (let currentNumber = 1; currentNumber <= numberOfNodes; currentNumber++) {
    parentArray[currentNumber] = currentNumber;
    rankArray[currentNumber] = 0;
  }

  const findRoot = (nodeIdentifier) => {
    if (parentArray[nodeIdentifier] === nodeIdentifier) {
      return nodeIdentifier;
    }
    const representativeNode = findRoot(parentArray[nodeIdentifier]);
    parentArray[nodeIdentifier] = representativeNode;
    return representativeNode;
  };

  const combineSets = (leftNode, rightNode) => {
    const rootOfLeft = findRoot(leftNode);
    const rootOfRight = findRoot(rightNode);

    if (rootOfLeft !== rootOfRight) {
      if (rankArray[rootOfLeft] < rankArray[rootOfRight]) {
        parentArray[rootOfLeft] = rootOfRight;
      } else if (rankArray[rootOfRight] < rankArray[rootOfLeft]) {
        parentArray[rootOfRight] = rootOfLeft;
      } else {
        parentArray[rootOfRight] = rootOfLeft;
        rankArray[rootOfLeft]++;
      }
      return true;
    }
    return false;
  };

  for (const edgeEntry of edges) {
    const [startVertex, endVertex] = edgeEntry;
    if (!combineSets(startVertex, endVertex)) {
      return [startVertex, endVertex];
    }
  }
};
