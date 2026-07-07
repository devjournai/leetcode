/**
 * Flatten Deeply Nested Array
 * Intuition: An iterative approach using a stack can flatten a nested array while preserving order. By pushing elements onto the stack in reverse order, and then processing them by popping, we ensure the natural left-to-right order is maintained in the final flattened array. Each element on the stack is accompanied by its current depth to determine if further flattening is needed.
 * Approach: 1. Initialize an empty array `flattenedResult` for the output and an empty `elementsToProcess` stack. 2. Populate the stack by pushing elements from the input `arr` in reverse order, each paired with an initial depth of 0. 3. Iterate while the `elementsToProcess` stack is not empty. 4. In each iteration, pop an item `[currentValue, currentDepth]` from the stack. 5. If `currentValue` is an array AND `currentDepth` is less than the target depth `n`, push its elements onto the `elementsToProcess` stack in reverse order, incrementing their depth by one. 6. Otherwise (if `currentValue` is not an array, or the depth limit `n` has been reached), add `currentValue` to the `flattenedResult` array. 7. After the loop completes, return `flattenedResult`.
 * Dry Run: arr = [1, [2, 3, [4]], 5], n = 2
 * 1. flattenedResult = [], elementsToProcess = []
 * 2. Push initial elements in reverse:
 *    elementsToProcess = [[5, 0], [[2, 3, [4]], 0], [1, 0]]
 * 3. Loop:
 *    a. Pop [1, 0]. 1 is not array. flattenedResult = [1]
 *    b. Pop [[2, 3, [4]], 0]. Is array, 0 < 2. Push elements in reverse with depth 1:
 *       elementsToProcess = [[5, 0], [[4], 1], [3, 1], [2, 1]]
 *    c. Pop [2, 1]. 2 is not array. flattenedResult = [1, 2]
 *    d. Pop [3, 1]. 3 is not array. flattenedResult = [1, 2, 3]
 *    e. Pop [[4], 1]. Is array, 1 < 2. Push elements in reverse with depth 2:
 *       elementsToProcess = [[5, 0], [4, 2]]
 *    f. Pop [4, 2]. 4 is not array (and 2 is not < 2 anyway). flattenedResult = [1, 2, 3, 4]
 *    g. Pop [5, 0]. 5 is not array. flattenedResult = [1, 2, 3, 4, 5]
 * 4. elementsToProcess is empty. Loop ends.
 * 5. Return [1, 2, 3, 4, 5].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var flat = function (arr, n) {
  const flattenedResult = [];
  const elementsToProcess = [];

  for (let initialIndex = arr.length - 1; initialIndex >= 0; initialIndex--) {
    elementsToProcess.push([arr[initialIndex], 0]);
  }

  while (elementsToProcess.length > 0) {
    const currentItemAndDepth = elementsToProcess.pop();
    const elementToExamine = currentItemAndDepth[0];
    const elementCurrentDepth = currentItemAndDepth[1];

    if (Array.isArray(elementToExamine) && elementCurrentDepth < n) {
      for (
        let subArrayIndex = elementToExamine.length - 1;
        subArrayIndex >= 0;
        subArrayIndex--
      ) {
        elementsToProcess.push([
          elementToExamine[subArrayIndex],
          elementCurrentDepth + 1,
        ]);
      }
    } else {
      flattenedResult.push(elementToExamine);
    }
  }

  return flattenedResult;
};
