/**
 * Intervals Between Identical Elements
 * Intuition: Group identical elements by their values and process their indices together. The sum of intervals for an index `i` can be efficiently calculated by starting with the first index in its group and iteratively updating the sum for subsequent indices. Moving from `indices[p]` to `indices[p+1]`, the absolute difference `|indices[p] - indices[k]|` changes by `indices[p+1] - indices[p]` for all `k <= p` (which are now `indices[p+1] - indices[k]`) and by `-(indices[p+1] - indices[p])` for all `k > p` (which are now `indices[k] - indices[p+1]`).
 * Approach: 1. Create a hash map to store lists of indices for each unique value in the input array. Iterate through the input array once to populate this map. 2. Initialize a result array of the same length as the input array, filled with zeros. 3. Iterate through the values (lists of indices) in the hash map. For each list of indices: 4. Calculate the sum of intervals for the first index in the list. This is `(indices[1] - indices[0]) + (indices[2] - indices[0]) + ...`. 5. Store this sum in the result array at `indices[0]`. 6. For subsequent indices `indices[p]` (from `p=1` to `length-1`), update the sum using a dynamic formula: `newSum = previousSum + (indices[p] - indices[p-1]) * (p - (totalElementsInGroup - p))`. 7. Store each updated sum in the result array at its corresponding index `indices[p]`.
 * Dry Run: arr = [2, 1, 3, 1, 2, 3]
 *   arraySize = 6
 *   answerArray = [0, 0, 0, 0, 0, 0]
 *   indicesByValue = Map()
 *
 *   Populating indicesByValue (using forEach):
 *   - elementIndex=0, elementValue=2: indicesByValue.set(2, [0])
 *   - elementIndex=1, elementValue=1: indicesByValue.set(1, [1])
 *   - elementIndex=2, elementValue=3: indicesByValue.set(3, [2])
 *   - elementIndex=3, elementValue=1: currentMappedIndices.push(3) => [1, 3]
 *   - elementIndex=4, elementValue=2: currentMappedIndices.push(4) => [0, 4]
 *   - elementIndex=5, elementValue=3: currentMappedIndices.push(5) => [2, 5]
 *   Final indicesByValue = { 2: [0, 4], 1: [1, 3], 3: [2, 5] }
 *
 *   Processing groups (using while loop for map entries):
 *   1. currentGroupIndices = [0, 4] (for value 2), groupSize = 2
 *      - currentTotalSum = 0
 *      - indexForInitialSum = 1: currentTotalSum += (4 - 0) = 4. indexForInitialSum = 2.
 *      - answerArray[0] = 4
 *      - indexForDynamicUpdate = 1 (do-while loop):
 *        - spanDifference = 4 - 0 = 4
 *        - currentTotalSum += 4 * (1 - (2 - 1)) = 4 * (1 - 1) = 0. currentTotalSum remains 4.
 *        - answerArray[4] = 4
 *        - indexForDynamicUpdate = 2. Loop ends.
 *      answerArray = [4, 0, 0, 0, 4, 0]
 *
 *   2. currentGroupIndices = [1, 3] (for value 1), groupSize = 2
 *      - currentTotalSum = 0
 *      - indexForInitialSum = 1: currentTotalSum += (3 - 1) = 2. indexForInitialSum = 2.
 *      - answerArray[1] = 2
 *      - indexForDynamicUpdate = 1 (do-while loop):
 *        - spanDifference = 3 - 1 = 2
 *        - currentTotalSum += 2 * (1 - (2 - 1)) = 0. currentTotalSum remains 2.
 *        - answerArray[3] = 2
 *        - indexForDynamicUpdate = 2. Loop ends.
 *      answerArray = [4, 2, 0, 2, 4, 0]
 *
 *   3. currentGroupIndices = [2, 5] (for value 3), groupSize = 2
 *      - currentTotalSum = 0
 *      - indexForInitialSum = 1: currentTotalSum += (5 - 2) = 3. indexForInitialSum = 2.
 *      - answerArray[2] = 3
 *      - indexForDynamicUpdate = 1 (do-while loop):
 *        - spanDifference = 5 - 2 = 3
 *        - currentTotalSum += 3 * (1 - (2 - 1)) = 0. currentTotalSum remains 3.
 *        - answerArray[5] = 3
 *        - indexForDynamicUpdate = 2. Loop ends.
 *      answerArray = [4, 2, 3, 2, 4, 3]
 *
 *   Return [4, 2, 3, 2, 4, 3].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var getDistances = function (arr) {
  const arraySize = arr.length;
  const answerArray = new Array(arraySize).fill(0);
  const indicesByValue = new Map();

  arr.forEach((elementValue, elementIndex) => {
    if (!indicesByValue.has(elementValue)) {
      indicesByValue.set(elementValue, []);
    }
    const currentMappedIndices = indicesByValue.get(elementValue);
    currentMappedIndices.push(elementIndex);
  });

  const mapIterator = indicesByValue.values();
  let mapEntry = mapIterator.next();

  while (!mapEntry.done) {
    const currentGroupIndices = mapEntry.value;
    const groupSize = currentGroupIndices.length;

    if (groupSize > 1) {
      let currentTotalSum = 0;
      let indexForInitialSum = 1;
      while (indexForInitialSum < groupSize) {
        currentTotalSum +=
          currentGroupIndices[indexForInitialSum] - currentGroupIndices[0];
        indexForInitialSum++;
      }
      answerArray[currentGroupIndices[0]] = currentTotalSum;

      let indexForDynamicUpdate = 1;
      do {
        const spanDifference =
          currentGroupIndices[indexForDynamicUpdate] -
          currentGroupIndices[indexForDynamicUpdate - 1];
        currentTotalSum +=
          spanDifference *
          (indexForDynamicUpdate - (groupSize - indexForDynamicUpdate));
        answerArray[currentGroupIndices[indexForDynamicUpdate]] =
          currentTotalSum;
        indexForDynamicUpdate++;
      } while (indexForDynamicUpdate < groupSize);
    }
    mapEntry = mapIterator.next();
  }

  return answerArray;
};
