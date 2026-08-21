/**
 * Minimum Operations To Make A Subsequence
 * Intuition: Operations insert missing `target` values. The kept subsequence is LCS of `target` and `arr`; because `target` has distinct values this LCS is LIS on `arr` mapped to `target` indices. Answer is `target.length - LIS`.
 * Approach: 1. Map target values to indices. 2. Collect those indices in `arr` order as `filteredIndicesSequence`. 3. Patience-sort LIS into `lisTrackingArray` via `findInsertionPoint`. 4. Return `targetParam.length - lisTrackingArray.length`.
 * Dry Run: target = [5,1,3], arr = [9,4,2,3,4]
 * mapped sequence [2] (only 3). LIS length 1 → operations = 3-1 = 2.
 * Time Complexity: O(arr.length * log(target.length))
 * Space Complexity: O(target.length + arr.length)
 */
var minOperations = function (targetParam, arrayParam) {
  const valueMapToIndex = new Map();
  targetParam.forEach((elementValue, elementIndex) => {
    valueMapToIndex.set(elementValue, elementIndex);
  });

  const filteredIndicesSequence = [];
  for (
    let currentArrIndex = 0;
    currentArrIndex < arrayParam.length;
    currentArrIndex++
  ) {
    const currentArrayElement = arrayParam[currentArrIndex];
    if (valueMapToIndex.has(currentArrayElement)) {
      filteredIndicesSequence.push(valueMapToIndex.get(currentArrayElement));
    }
  }

  const lisTrackingArray = [];
  for (const currentMappedIndex of filteredIndicesSequence) {
    const insertionPosition = findInsertionPoint(
      lisTrackingArray,
      currentMappedIndex
    );
    if (insertionPosition === lisTrackingArray.length) {
      lisTrackingArray.push(currentMappedIndex);
    } else {
      lisTrackingArray[insertionPosition] = currentMappedIndex;
    }
  }

  return targetParam.length - lisTrackingArray.length;
};

function findInsertionPoint(sortedSequence, valueToInsert) {
  let startPointer = 0;
  let endPointer = sortedSequence.length;

  while (startPointer < endPointer) {
    const middleIndex = Math.floor((startPointer + endPointer) / 2);
    if (sortedSequence[middleIndex] < valueToInsert) {
      startPointer = middleIndex + 1;
    } else {
      endPointer = middleIndex;
    }
  }

  return startPointer;
}
