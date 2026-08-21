/**
 * Rank Transform of an Array
 * Intuition: To assign ranks, we need to determine the sorted order of unique elements. Each element in the original array then gets a rank corresponding to its position in this sorted unique list. We must also ensure that elements with identical values receive the same rank. By pairing each number with its original index and sorting, we can iterate through the sorted data to assign ranks while preserving the ability to place them back into their original positions.
 * Approach: 1. Create a temporary array of objects, where each object holds an element's value and its original index from the input array. 2. Sort this temporary array of objects based on their values in ascending order. 3. Initialize a result array of the same length as the input array. 4. Iterate through the sorted temporary array, maintaining a counter for the current rank and keeping track of the value of the previously processed element. If the current element's value is greater than the previous element's value, increment the rank counter. Assign the current rank to the corresponding original index in the result array. 5. Return the fully populated result array.
 * Dry Run: arr = [37, 12, 28, 9, 100, 56, 80, 5, 12]
 * 1. `initialIndexedValues`:
 *    [{elementValue: 37, originalPosition: 0}, ..., {elementValue: 12, originalPosition: 8}]
 * 2. `initialIndexedValues` sorted by `elementValue`:
 *    [{elementValue: 5, originalPosition: 7}, {elementValue: 9, originalPosition: 3}, {elementValue: 12, originalPosition: 1}, {elementValue: 12, originalPosition: 8}, {elementValue: 28, originalPosition: 2}, {elementValue: 37, originalPosition: 0}, {elementValue: 56, originalPosition: 5}, {elementValue: 80, originalPosition: 6}, {elementValue: 100, originalPosition: 4}]
 * 3. Initialize `transformedRanks = new Array(9)`, `currentRanking = 1`, `previousElementValue = null`.
 * 4. Iterate through sorted `initialIndexedValues`:
 *    - Process {5, 7}: `transformedRanks[7] = 1`. `previousElementValue = 5`. `currentRanking` remains 1.
 *    - Process {9, 3}: `9 > 5`, `currentRanking` becomes 2. `transformedRanks[3] = 2`. `previousElementValue = 9`.
 *    - Process {12, 1}: `12 > 9`, `currentRanking` becomes 3. `transformedRanks[1] = 3`. `previousElementValue = 12`.
 *    - Process {12, 8}: `12 > 12` is false. `transformedRanks[8] = 3`. `previousElementValue = 12`.
 *    - Process {28, 2}: `28 > 12`, `currentRanking` becomes 4. `transformedRanks[2] = 4`. `previousElementValue = 28`.
 *    - Continue this process for all items.
 * 5. Final `transformedRanks`: `[5, 3, 4, 2, 8, 6, 7, 1, 3]`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var arrayRankTransform = function (arr) {
  if (arr.length === 0) {
    return [];
  }

  let initialIndexedValues = [];
  for (let indexPosition = 0; indexPosition < arr.length; indexPosition++) {
    initialIndexedValues.push({
      elementValue: arr[indexPosition],
      originalPosition: indexPosition,
    });
  }

  initialIndexedValues.sort(
    (itemA, itemB) => itemA.elementValue - itemB.elementValue
  );

  let transformedRanks = new Array(arr.length);
  let currentRanking = 1;
  let previousElementValue = null;

  transformedRanks[initialIndexedValues[0].originalPosition] = currentRanking;
  previousElementValue = initialIndexedValues[0].elementValue;

  for (
    let sortIterator = 1;
    sortIterator < initialIndexedValues.length;
    sortIterator++
  ) {
    const currentDataItem = initialIndexedValues[sortIterator];
    if (currentDataItem.elementValue > previousElementValue) {
      currentRanking++;
    }
    transformedRanks[currentDataItem.originalPosition] = currentRanking;
    previousElementValue = currentDataItem.elementValue;
  }

  return transformedRanks;
};
