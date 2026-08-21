/**
 * Restore The Array From Adjacent Pairs
 * Intuition: Adjacent pairs form a path graph. Endpoints have degree 1; walk from one end following the unused neighbor.
 * Approach: 1. Build `adjacencyMap` lists. 2. Find `arrayStartElement` with one neighbor. 3. Walk until `reconstructedPath` has n = pairs+1 nodes, always stepping to the neighbor ≠ `priorValueInPath`. 4. Return the path.
 * Dry Run: adjacentPairs = [[2,1],[3,4],[3,2]]
 * Start 1 → 2 → 3 → 4.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var restoreArray = function (adjacentPairs) {
  const adjacencyMap = new Map();

  for (const pair of adjacentPairs) {
    const firstNumber = pair[0];
    const secondNumber = pair[1];

    adjacencyMap.set(
      firstNumber,
      (adjacencyMap.get(firstNumber) || []).concat(secondNumber)
    );
    adjacencyMap.set(
      secondNumber,
      (adjacencyMap.get(secondNumber) || []).concat(firstNumber)
    );
  }

  let arrayStartElement;
  for (const [nodeIdentifier, connectedNodes] of adjacencyMap) {
    if (connectedNodes.length === 1) {
      arrayStartElement = nodeIdentifier;
      break;
    }
  }

  const reconstructedPath = [];
  reconstructedPath.push(arrayStartElement);

  let priorValueInPath = arrayStartElement;
  let currentValueInPath = adjacencyMap.get(arrayStartElement)[0];

  const totalExpectedLength = adjacentPairs.length + 1;

  while (reconstructedPath.length < totalExpectedLength) {
    reconstructedPath.push(currentValueInPath);

    const neighborValues = adjacencyMap.get(currentValueInPath);

    if (neighborValues.length === 1) {
      break;
    }

    const nextValueInPath =
      neighborValues[0] === priorValueInPath
        ? neighborValues[1]
        : neighborValues[0];

    priorValueInPath = currentValueInPath;
    currentValueInPath = nextValueInPath;
  }

  return reconstructedPath;
};
