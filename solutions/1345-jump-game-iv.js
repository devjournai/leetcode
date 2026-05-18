/**
 * Jump Game IV
 * Intuition: This is a shortest path problem on an unweighted graph, where array indices are nodes and valid jumps are edges. Breadth-First Search (BFS) is the optimal algorithm for finding the minimum number of steps in such a graph.
 * Approach: 1. Preprocess the array to create a map storing each value and all indices where it appears. This optimizes "same-value" jumps. 2. Initialize a BFS queue with the starting index (0), a set to track visited indices, and a step counter. 3. Perform a level-by-level BFS. For each index dequeued, explore its three types of neighbors: `index + 1`, `index - 1`, and all other indices with the same value. 4. If a neighbor is valid (within bounds) and not yet visited, mark it as visited and enqueue it for the next level. 5. Crucially, after processing all same-value jumps from a current index, remove that value's entry from the map. This prevents redundant exploration of same-value indices in future steps, optimizing the search significantly. 6. Increment the step counter after processing each level. 7. Return the step counter once the last index is reached.
 * Dry Run: arr = [7, 6, 9, 6, 7]
 * arrLength = 5
 * valIndexMap: { 7: [0, 4], 6: [1, 3], 9: [2] }
 * processedIndices = Set()
 * currentLevelQueue = []
 * jumpCount = 0
 *
 * Initial: processedIndices.add(0), currentLevelQueue.push(0) -> [0]
 *
 * Loop 1 (jumpCount = 0):
 *   currentLevelItems = 1
 *   processingIndex = currentLevelQueue.shift() -> 0
 *   0 != arrLength - 1 (4)
 *   nextIdxForward = 1. 1 < 5 && !processedIndices.has(1). processedIndices.add(1), nextLevelQueue.push(1) -> [1]
 *   nextIdxBackward = -1. Invalid.
 *   matchingValueIndices for arr[0]=7: [0, 4]
 *     targetIndex = 0. processed.
 *     targetIndex = 4. 4 < 5 && !processedIndices.has(4). processedIndices.add(4), nextLevelQueue.push(4) -> [1, 4]
 *   valIndexMap.delete(7)
 *   currentLevelQueue = [1, 4]
 *   jumpCount = 1
 *
 * Loop 2 (jumpCount = 1):
 *   currentLevelItems = 2
 *   processingIndex = currentLevelQueue.shift() -> 1
 *   1 != arrLength - 1 (4)
 *   nextIdxForward = 2. 2 < 5 && !processedIndices.has(2). processedIndices.add(2), nextLevelQueue.push(2) -> [2]
 *   nextIdxBackward = 0. processed.
 *   matchingValueIndices for arr[1]=6: [1, 3]
 *     targetIndex = 1. processed.
 *     targetIndex = 3. 3 < 5 && !processedIndices.has(3). processedIndices.add(3), nextLevelQueue.push(3) -> [2, 3]
 *   valIndexMap.delete(6)
 *   processingIndex = currentLevelQueue.shift() -> 4
 *   4 == arrLength - 1 (4). Return jumpCount (1).
 *
 * The last index (4) is reached in 1 step from index 0 (jump from 0 to 4 because arr[0] == arr[4]).
 * Return value: 1
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minJumps = function (arr) {
  const arrLength = arr.length;
  if (arrLength <= 1) {
    return 0;
  }

  const valIndexMap = new Map();
  for (let arrayIteration = 0; arrayIteration < arrLength; arrayIteration++) {
    if (!valIndexMap.has(arr[arrayIteration])) {
      valIndexMap.set(arr[arrayIteration], []);
    }
    valIndexMap.get(arr[arrayIteration]).push(arrayIteration);
  }

  const processedIndices = new Set();
  const currentLevelQueue = [];
  processedIndices.add(0);
  currentLevelQueue.push(0);
  let jumpCount = 0;

  while (currentLevelQueue.length > 0) {
    let currentLevelItems = currentLevelQueue.length;
    const nextLevelQueue = [];

    for (let levelIndex = 0; levelIndex < currentLevelItems; levelIndex++) {
      const processingIndex = currentLevelQueue.shift();

      if (processingIndex === arrLength - 1) {
        return jumpCount;
      }

      const nextIdxForward = processingIndex + 1;
      if (nextIdxForward < arrLength && !processedIndices.has(nextIdxForward)) {
        processedIndices.add(nextIdxForward);
        nextLevelQueue.push(nextIdxForward);
      }

      const nextIdxBackward = processingIndex - 1;
      if (nextIdxBackward >= 0 && !processedIndices.has(nextIdxBackward)) {
        processedIndices.add(nextIdxBackward);
        nextLevelQueue.push(nextIdxBackward);
      }

      const matchingValueIndices = valIndexMap.get(arr[processingIndex]);
      if (matchingValueIndices) {
        for (
          let sameValIter = 0;
          sameValIter < matchingValueIndices.length;
          sameValIter++
        ) {
          const targetIndex = matchingValueIndices[sameValIter];
          if (!processedIndices.has(targetIndex)) {
            processedIndices.add(targetIndex);
            nextLevelQueue.push(targetIndex);
          }
        }
        valIndexMap.delete(arr[processingIndex]);
      }
    }
    currentLevelQueue.push(...nextLevelQueue);
    jumpCount++;
  }

  return -1;
};
