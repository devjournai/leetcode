/**
 * Filter Elements From Array
 * Intuition: The goal is to construct a new array containing only elements from the original array that satisfy a given condition. This requires iterating through each element and its index, applying the condition, and conditionally adding the element to the new array.
 * Approach: 1. Initialize an empty array, `filteredElementsCollection`, to store the elements that pass the filter. 2. Initialize an index counter, `currentIterationIndex`, to 0. 3. Use a `while` loop to iterate through the input array `arr` as long as `currentIterationIndex` is less than the length of `arr`. 4. Inside the loop, retrieve the element at `arr[currentIterationIndex]`, storing it in `itemValue`. 5. Apply the filtering function `fn` to `itemValue` and `currentIterationIndex`. 6. If the result of `fn` is truthy, push `itemValue` into `filteredElementsCollection`. 7. Increment `currentIterationIndex` for the next iteration. 8. After the loop completes, return `filteredElementsCollection`.
 * Dry Run: arr = [0, 10, 20, 30], fn = (n) => n > 10
 * filteredElementsCollection = []
 * currentIterationIndex = 0
 * arraySize = 4
 *
 * Loop 1:
 *   currentIterationIndex = 0 (0 < 4 is true)
 *   itemValue = arr[0] = 0
 *   fn(0, 0) -> 0 > 10 is false
 *   currentIterationIndex becomes 1
 *
 * Loop 2:
 *   currentIterationIndex = 1 (1 < 4 is true)
 *   itemValue = arr[1] = 10
 *   fn(10, 1) -> 10 > 10 is false
 *   currentIterationIndex becomes 2
 *
 * Loop 3:
 *   currentIterationIndex = 2 (2 < 4 is true)
 *   itemValue = arr[2] = 20
 *   fn(20, 2) -> 20 > 10 is true
 *   filteredElementsCollection becomes [20]
 *   currentIterationIndex becomes 3
 *
 * Loop 4:
 *   currentIterationIndex = 3 (3 < 4 is true)
 *   itemValue = arr[3] = 30
 *   fn(30, 3) -> 30 > 10 is true
 *   filteredElementsCollection becomes [20, 30]
 *   currentIterationIndex becomes 4
 *
 * Loop 5:
 *   currentIterationIndex = 4 (4 < 4 is false) -> loop terminates.
 *
 * Return [20, 30]
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
var filter = function (arr, fn) {
  const filteredElementsCollection = [];
  let currentIterationIndex = 0;
  const arraySize = arr.length;

  while (currentIterationIndex < arraySize) {
    const itemValue = arr[currentIterationIndex];
    if (fn(itemValue, currentIterationIndex)) {
      filteredElementsCollection.push(itemValue);
    }
    currentIterationIndex++;
  }

  return filteredElementsCollection;
};
