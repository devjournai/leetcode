/**
 * Minimum Number Of Operations To Sort A Binary Tree By Level
 * Intuition: Sorting each level of the binary tree independently is equivalent to finding the minimum number of swaps needed to sort each level's array of values. The minimum swaps to sort an array can be found by tracking elements' desired positions using a map and performing swaps when an element is out of place.
 * Approach: 1. Perform a Breadth-First Search (BFS) to traverse the binary tree level by level, collecting all node values for each level into separate arrays. 2. For each collected array representing a level's values, create a sorted copy of that array to determine the target order. 3. Initialize a map to store the current index of each value in the unsorted level array. 4. Iterate through the unsorted level array: if an element at a given index is not equal to the element at the same index in the sorted array, it means a swap is needed. Find the current index of the correct element using the map, swap the elements in the unsorted array, and update their positions in the map. Increment a swap counter for this level. 5. Sum the swap counters from all levels to get the total minimum operations.
 * Dry Run: root = [1,4,3,7,null,8,6]
 *   Level 0: [1] -> Sorted: [1]. 0 swaps.
 *   Level 1: [4,3] -> Sorted: [3,4].
 *     Initial map: {4:0, 3:1}
 *     i=0: values[0]=4, sorted[0]=3. Mismatch.
 *       Swap count = 1.
 *       Correct value 3 is at index 1. Swap values[0] and values[1]. Array becomes [3,4].
 *       Update map: {4:1, 3:0}.
 *     i=1: values[1]=4, sorted[1]=4. Match.
 *     Level 1 total swaps = 1.
 *   Level 2: [7,8,6] -> Sorted: [6,7,8].
 *     Initial map: {7:0, 8:1, 6:2}
 *     i=0: values[0]=7, sorted[0]=6. Mismatch.
 *       Swap count = 1.
 *       Correct value 6 is at index 2. Swap values[0] and values[2]. Array becomes [6,8,7].
 *       Update map: {7:2, 8:1, 6:0}.
 *     i=1: values[1]=8, sorted[1]=7. Mismatch.
 *       Swap count = 2.
 *       Correct value 7 is at index 2 (from map). Swap values[1] and values[2]. Array becomes [6,7,8].
 *       Update map: {7:1, 8:2, 6:0}.
 *     i=2: values[2]=8, sorted[2]=8. Match.
 *     Level 2 total swaps = 2.
 * Total operations = 0 + 1 + 2 = 3.
 * Time Complexity: O(N log K_max)
 * Space Complexity: O(N)
 */
var minimumOperations = function (root) {
  let totalOperations = 0;

  if (!root) {
    return totalOperations;
  }

  const bfsQueue = [root];
  const storedLevelValues = [];

  while (bfsQueue.length > 0) {
    const currentLevelNodesCount = bfsQueue.length;
    const currentLevelValuesCollection = [];
    let currentLevelNodeIterator = 0;

    for (
      currentLevelNodeIterator = 0;
      currentLevelNodeIterator < currentLevelNodesCount;
      currentLevelNodeIterator++
    ) {
      const dequeuedNode = bfsQueue.shift();
      currentLevelValuesCollection.push(dequeuedNode.val);

      const leftChildReference = dequeuedNode.left;
      if (leftChildReference) {
        bfsQueue.push(leftChildReference);
      }

      const rightChildReference = dequeuedNode.right;
      if (rightChildReference) {
        bfsQueue.push(rightChildReference);
      }
    }
    storedLevelValues.push(currentLevelValuesCollection);
  }

  let levelProcessorIndex = 0;
  for (
    levelProcessorIndex = 0;
    levelProcessorIndex < storedLevelValues.length;
    levelProcessorIndex++
  ) {
    const currentLevelNumericalValues = storedLevelValues[levelProcessorIndex];
    if (currentLevelNumericalValues.length <= 1) {
      continue;
    }

    const sortedLevelCopy = [...currentLevelNumericalValues].sort(
      (valueOne, valueTwo) => valueOne - valueTwo
    );
    const valuePositionMap = new Map();
    let mapEntryCreator = 0;

    for (
      mapEntryCreator = 0;
      mapEntryCreator < currentLevelNumericalValues.length;
      mapEntryCreator++
    ) {
      valuePositionMap.set(
        currentLevelNumericalValues[mapEntryCreator],
        mapEntryCreator
      );
    }

    let currentLevelSwapCount = 0;
    let elementCheckPointer = 0;

    for (
      elementCheckPointer = 0;
      elementCheckPointer < currentLevelNumericalValues.length;
      elementCheckPointer++
    ) {
      const valueAtCurrentSpot =
        currentLevelNumericalValues[elementCheckPointer];
      const targetValueForSpot = sortedLevelCopy[elementCheckPointer];

      if (valueAtCurrentSpot !== targetValueForSpot) {
        currentLevelSwapCount++;
        const correctValueOriginalPosition =
          valuePositionMap.get(targetValueForSpot);

        [
          currentLevelNumericalValues[elementCheckPointer],
          currentLevelNumericalValues[correctValueOriginalPosition],
        ] = [
          currentLevelNumericalValues[correctValueOriginalPosition],
          currentLevelNumericalValues[elementCheckPointer],
        ];

        valuePositionMap.set(valueAtCurrentSpot, correctValueOriginalPosition);
        valuePositionMap.set(targetValueForSpot, elementCheckPointer);
      }
    }
    totalOperations += currentLevelSwapCount;
  }

  return totalOperations;
};
