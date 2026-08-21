/**
 * Build A Matrix With Conditions
 * Intuition: The problem can be decoupled into two independent topological sorting problems: one for determining the relative row order of numbers and another for determining their relative column order. If a valid topological order cannot be found for either set of conditions, then no solution exists.
 * Approach: 1. Implement a helper function `processConditions` that performs a topological sort using Kahn's algorithm (BFS-based). This function takes a list of conditions (edges) and the number of elements `k` (size) as input. It builds an adjacency list and an in-degree array, initializes a queue with nodes having zero in-degree, and processes nodes by decrementing neighbors' in-degrees and adding new zero in-degree nodes to the queue. It returns the sorted order or an empty array if a cycle is detected. 2. Call `processConditions` for `rowConditions` to get `rowOrdering`. If `rowOrdering` is empty, return an empty matrix. 3. Call `processConditions` for `colConditions` to get `columnOrdering`. If `columnOrdering` is empty, return an empty matrix. 4. If both orderings are valid, initialize a `k x k` matrix with zeros. 5. Create two auxiliary arrays, `rowPositionMap` and `columnPositionMap`, to store the final row and column index for each number (1 to k). 6. Populate `rowPositionMap` by iterating through `rowOrdering`: `rowPositionMap[number] = its_index_in_rowOrdering`. 7. Populate `columnPositionMap` similarly using `columnOrdering`. 8. Iterate from 1 to `k` (for each number) and place the `currentNumber` into `outputMatrix[rowPositionMap[currentNumber]][columnPositionMap[currentNumber]]`. 9. Return the `outputMatrix`.
 * Dry Run:
 * k = 3, rowConditions = [[1,2],[3,1]], colConditions = [[2,1],[3,2]]
 *
 * 1. processConditions(rowConditions, 3):
 *    - Graph: 3 -> 1 -> 2
 *    - Initial inDegrees: [0,1,1,0] (index 0 unused, index 1 for num 1, etc.)
 *    - Queue: [3]
 *    - Pop 3, add to finalOrder: [3]. Decrement inDegree[1]. inDegree[1] becomes 0. Push 1 to queue. Queue: [1].
 *    - Pop 1, add to finalOrder: [3,1]. Decrement inDegree[2]. inDegree[2] becomes 0. Push 2 to queue. Queue: [2].
 *    - Pop 2, add to finalOrder: [3,1,2]. Queue empty.
 *    - Return rowOrdering = [3,1,2].
 *
 * 2. processConditions(colConditions, 3):
 *    - Graph: 3 -> 2 -> 1
 *    - Initial inDegrees: [0,1,1,0]
 *    - Queue: [3]
 *    - Pop 3, add to finalOrder: [3]. Decrement inDegree[2]. inDegree[2] becomes 0. Push 2 to queue. Queue: [2].
 *    - Pop 2, add to finalOrder: [3,2]. Decrement inDegree[1]. inDegree[1] becomes 0. Push 1 to queue. Queue: [1].
 *    - Pop 1, add to finalOrder: [3,2,1]. Queue empty.
 *    - Return columnOrdering = [3,2,1].
 *
 * 3. Initialize outputMatrix = [[0,0,0],[0,0,0],[0,0,0]].
 *    Initialize rowPositionMap = [0,0,0,0], columnPositionMap = [0,0,0,0].
 *
 * 4. Populate rowPositionMap from rowOrdering [3,1,2]:
 *    - rowPositionMap[3] = 0 (3 is at index 0)
 *    - rowPositionMap[1] = 1 (1 is at index 1)
 *    - rowPositionMap[2] = 2 (2 is at index 2)
 *    - rowPositionMap becomes [0,1,2,0] (numbers -> row index)
 *
 * 5. Populate columnPositionMap from columnOrdering [3,2,1]:
 *    - columnPositionMap[3] = 0 (3 is at index 0)
 *    - columnPositionMap[2] = 1 (2 is at index 1)
 *    - columnPositionMap[1] = 2 (1 is at index 2)
 *    - columnPositionMap becomes [0,2,1,0] (numbers -> column index)
 *
 * 6. Populate outputMatrix:
 *    - For number = 1: outputMatrix[rowPositionMap[1]][columnPositionMap[1]] = outputMatrix[1][2] = 1.
 *    - For number = 2: outputMatrix[rowPositionMap[2]][columnPositionMap[2]] = outputMatrix[2][1] = 2.
 *    - For number = 3: outputMatrix[rowPositionMap[3]][columnPositionMap[3]] = outputMatrix[0][0] = 3.
 *
 * 7. Resulting outputMatrix:
 *    [[3, 0, 0],
 *     [0, 0, 1],
 *     [0, 2, 0]]
 *
 * Time Complexity: O(k^2 + n + m)
 * Space Complexity: O(k^2 + n + m)
 */
var buildMatrix = function (k, rowConditions, colConditions) {
  const processConditions = (edgesInput, arrayLength) => {
    const graphAdjacencyList = Array.from(
      { length: arrayLength + 1 },
      () => []
    );
    const currentInDegree = new Array(arrayLength + 1).fill(0);

    for (const edgePair of edgesInput) {
      const sourceNode = edgePair[0];
      const targetNode = edgePair[1];
      graphAdjacencyList[sourceNode].push(targetNode);
      currentInDegree[targetNode]++;
    }

    const processingQueue = [];
    for (let elementIndex = 1; elementIndex <= arrayLength; elementIndex++) {
      if (currentInDegree[elementIndex] === 0) {
        processingQueue.push(elementIndex);
      }
    }

    const finalOrder = [];
    let queuePointer = 0;
    while (queuePointer < processingQueue.length) {
      const nodeToProcess = processingQueue[queuePointer++];
      finalOrder.push(nodeToProcess);

      for (const successorNode of graphAdjacencyList[nodeToProcess]) {
        currentInDegree[successorNode]--;
        if (currentInDegree[successorNode] === 0) {
          processingQueue.push(successorNode);
        }
      }
    }

    return finalOrder.length === arrayLength ? finalOrder : [];
  };

  const rowOrdering = processConditions(rowConditions, k);
  if (!rowOrdering.length) return [];

  const columnOrdering = processConditions(colConditions, k);
  if (!columnOrdering.length) return [];

  const outputMatrix = Array.from({ length: k }, () => new Array(k).fill(0));
  const rowPositionMap = new Array(k + 1).fill(0);
  const columnPositionMap = new Array(k + 1).fill(0);

  for (let initialIndex = 0; initialIndex < k; initialIndex++) {
    rowPositionMap[rowOrdering[initialIndex]] = initialIndex;
    columnPositionMap[columnOrdering[initialIndex]] = initialIndex;
  }

  for (let currentNumber = 1; currentNumber <= k; currentNumber++) {
    outputMatrix[rowPositionMap[currentNumber]][
      columnPositionMap[currentNumber]
    ] = currentNumber;
  }

  return outputMatrix;
};
