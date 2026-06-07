/**
 * Intersection Of Multiple Arrays
 * Intuition: The intersection of multiple arrays can be efficiently found by starting with the elements of the first array as the initial common set, and then iteratively refining this set by intersecting it with each subsequent array. Sets provide fast lookup and uniqueness guarantees, which are beneficial for this operation.
 * Approach: 1. Handle the edge case where the input `nums` might be empty (though problem constraints suggest it's not). 2. Initialize a `Set` (let's call it `commonNumbersSet`) with all distinct elements from the first array (`nums[0]`). 3. If `nums` contains only one array, convert `commonNumbersSet` to an array, sort it, and return. 4. Iterate through the rest of the arrays in `nums` (starting from the second array). For each `currentArrayData`, create a new `Set` (`nextArrayElementsSet`) containing its elements. 5. Create a temporary empty `Set` called `updatedCommonSet`. Iterate through each `numberCandidate` in `commonNumbersSet`. If `nextArrayElementsSet` contains `numberCandidate`, add `numberCandidate` to `updatedCommonSet`. 6. After iterating, replace `commonNumbersSet` with `updatedCommonSet`. This effectively performs the intersection. 7. Once all arrays have been processed, convert the final `commonNumbersSet` into an array. 8. Sort this resulting array in ascending order. 9. Return the sorted array.
 * Dry Run: nums = [[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]
 * 1. Check nums.length: 3, not 0.
 * 2. firstArraySource = nums[0] = [3,1,2,4,5].
 * 3. commonNumbersSet = new Set(firstArraySource) = {1, 2, 3, 4, 5}.
 * 4. Check nums.length again: 3, not 1. Proceed to loop.
 * 5. Start loop for arrayIterator from 1:
 *    - arrayIterator = 1:
 *      - currentArrayData = nums[1] = [1,2,3,4].
 *      - nextArrayElementsSet = new Set(currentArrayData) = {1, 2, 3, 4}.
 *      - updatedCommonSet = new Set().
 *      - Iterate numberCandidate in commonNumbersSet ({1, 2, 3, 4, 5}):
 *        - 1: nextArrayElementsSet.has(1) is true. updatedCommonSet.add(1). (updatedCommonSet = {1})
 *        - 2: nextArrayElementsSet.has(2) is true. updatedCommonSet.add(2). (updatedCommonSet = {1, 2})
 *        - 3: nextArrayElementsSet.has(3) is true. updatedCommonSet.add(3). (updatedCommonSet = {1, 2, 3})
 *        - 4: nextArrayElementsSet.has(4) is true. updatedCommonSet.add(4). (updatedCommonSet = {1, 2, 3, 4})
 *        - 5: nextArrayElementsSet.has(5) is false.
 *      - commonNumbersSet becomes updatedCommonSet = {1, 2, 3, 4}.
 *    - arrayIterator = 2:
 *      - currentArrayData = nums[2] = [3,4,5,6].
 *      - nextArrayElementsSet = new Set(currentArrayData) = {3, 4, 5, 6}.
 *      - updatedCommonSet = new Set().
 *      - Iterate numberCandidate in commonNumbersSet ({1, 2, 3, 4}):
 *        - 1: nextArrayElementsSet.has(1) is false.
 *        - 2: nextArrayElementsSet.has(2) is false.
 *        - 3: nextArrayElementsSet.has(3) is true. updatedCommonSet.add(3). (updatedCommonSet = {3})
 *        - 4: nextArrayElementsSet.has(4) is true. updatedCommonSet.add(4). (updatedCommonSet = {3, 4})
 *      - commonNumbersSet becomes updatedCommonSet = {3, 4}.
 * 6. Loop finishes.
 * 7. finalResultArray = Array.from(commonNumbersSet) = [3, 4].
 * 8. finalResultArray.sort((valueA, valueB) => valueA - valueB) results in [3, 4].
 * 9. Return [3, 4].
 * Time Complexity: O(N*M + M log M)
 * Space Complexity: O(M)
 */
var intersection = function (nums) {
  if (nums.length === 0) {
    return [];
  }

  let firstArraySource = nums[0];
  let commonNumbersSet = new Set(firstArraySource);

  if (nums.length === 1) {
    let singleArrayResult = Array.from(commonNumbersSet);
    singleArrayResult.sort((valueA, valueB) => valueA - valueB);
    return singleArrayResult;
  }

  for (let arrayIterator = 1; arrayIterator < nums.length; arrayIterator++) {
    let currentArrayData = nums[arrayIterator];
    let nextArrayElementsSet = new Set(currentArrayData);
    let updatedCommonSet = new Set();

    for (const numberCandidate of commonNumbersSet) {
      if (nextArrayElementsSet.has(numberCandidate)) {
        updatedCommonSet.add(numberCandidate);
      }
    }
    commonNumbersSet = updatedCommonSet;
  }

  let finalResultArray = Array.from(commonNumbersSet);
  finalResultArray.sort((valueA, valueB) => valueA - valueB);

  return finalResultArray;
};
