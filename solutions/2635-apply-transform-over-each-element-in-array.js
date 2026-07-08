/**
 * Apply Transform Over Each Element In Array
 * Intuition: To transform each element and its index, iterate through the input array and apply the given function to each pair, storing results in a new array.
 * Approach: 1. Initialize an empty array to store the transformed results. 2. Iterate from the first element to the last element of the input array using an index. 3. In each iteration, call the provided mapping function with the current array element and its index. 4. Push the result of the function call into the new array. 5. After iterating through all elements, return the new array.
 * Dry Run: arr = [1, 2, 3], fn = (num, idx) => num * 2 + idx
 *   1. transformedResults = []
 *   2. elementIndex = 0:
 *      currentValue = arr[0] (which is 1)
 *      mappedValue = fn(1, 0) => 1 * 2 + 0 = 2
 *      transformedResults.push(2) => transformedResults = [2]
 *   3. elementIndex = 1:
 *      currentValue = arr[1] (which is 2)
 *      mappedValue = fn(2, 1) => 2 * 2 + 1 = 5
 *      transformedResults.push(5) => transformedResults = [2, 5]
 *   4. elementIndex = 2:
 *      currentValue = arr[2] (which is 3)
 *      mappedValue = fn(3, 2) => 3 * 2 + 2 = 8
 *      transformedResults.push(8) => transformedResults = [2, 5, 8]
 *   5. Loop finishes.
 *   6. Return transformedResults, which is [2, 5, 8].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var map = function (arr, fn) {
  const transformedResults = [];
  const arrayLength = arr.length;

  for (let elementIndex = 0; elementIndex < arrayLength; elementIndex++) {
    const currentValue = arr[elementIndex];
    const mappedValue = fn(currentValue, elementIndex);
    transformedResults.push(mappedValue);
  }

  return transformedResults;
};
