/**
 * Minimum Operations To Make A Subsequence
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
      currentMappedIndex,
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
