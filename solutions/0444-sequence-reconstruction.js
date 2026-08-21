/**
 * Sequence Reconstruction
 * Intuition: `nums` is the unique supersequence iff the given subsequences induce a unique topological order that exactly matches `nums`.
 * Approach: 1. Build adjacency and indegrees from consecutive pairs in each sequence. 2. Queue all indegree-0 nodes; if that queue is not size 1, fail. 3. Kahn: always require a unique next node, decrement neighbors. 4. Length must equal n and `finalSequence` must equal `nums`.
 * Dry Run: nums=[1,2,3], sequences [[1,2],[1,3]]. Both 2 and 3 have indegree 1 after popping 1, queue size 2 → false.
 * Time Complexity: O(N + L)
 * Space Complexity: O(N + L)
 */
var sequenceReconstruction = function (nums, sequences) {
  const totalElements = nums.length;
  const adjacencyList = new Map();
  const nodeInDegrees = new Array(totalElements + 1).fill(0);

  for (
    let nodeIdentifier = 1;
    nodeIdentifier <= totalElements;
    nodeIdentifier++
  ) {
    adjacencyList.set(nodeIdentifier, []);
  }

  for (const currentSequence of sequences) {
    for (
      let elementPosition = 1;
      elementPosition < currentSequence.length;
      elementPosition++
    ) {
      const predecessorNode = currentSequence[elementPosition - 1];
      const successorNode = currentSequence[elementPosition];

      adjacencyList.get(predecessorNode).push(successorNode);
      nodeInDegrees[successorNode]++;
    }
  }

  const topologicalQueue = [];
  for (let currentNumber = 1; currentNumber <= totalElements; currentNumber++) {
    if (nodeInDegrees[currentNumber] === 0) {
      topologicalQueue.push(currentNumber);
    }
  }

  if (topologicalQueue.length !== 1) {
    return false;
  }

  const finalSequence = [];
  while (topologicalQueue.length > 0) {
    if (topologicalQueue.length > 1) {
      return false;
    }

    const poppedNode = topologicalQueue.shift();
    finalSequence.push(poppedNode);

    const connectedNeighbors = adjacencyList.get(poppedNode);
    for (
      let neighborIterator = 0;
      neighborIterator < connectedNeighbors.length;
      neighborIterator++
    ) {
      const specificNeighbor = connectedNeighbors[neighborIterator];
      nodeInDegrees[specificNeighbor]--;
      if (nodeInDegrees[specificNeighbor] === 0) {
        topologicalQueue.push(specificNeighbor);
      }
    }
  }

  if (finalSequence.length !== totalElements) {
    return false;
  }

  for (
    let sequenceChecker = 0;
    sequenceChecker < totalElements;
    sequenceChecker++
  ) {
    if (finalSequence[sequenceChecker] !== nums[sequenceChecker]) {
      return false;
    }
  }

  return true;
};
