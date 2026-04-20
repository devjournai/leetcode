/**
 * Redundant Connection
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
