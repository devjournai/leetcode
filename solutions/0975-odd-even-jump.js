/**
 * Odd Even Jump
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var oddEvenJumps = function (arr) {
  const arraySize = arr.length;

  const canReachOddPath = new Array(arraySize).fill(false);
  const canReachEvenPath = new Array(arraySize).fill(false);

  canReachOddPath[arraySize - 1] = true;
  canReachEvenPath[arraySize - 1] = true;

  let goodStartCount = 1;

  const nextJumpOddIndexMap = new Array(arraySize);
  const nextJumpEvenIndexMap = new Array(arraySize);

  const originalIndicesForOdd = Array.from(
    { length: arraySize },
    (_, idx) => idx,
  );
  originalIndicesForOdd.sort((firstIdx, secondIdx) => {
    if (arr[firstIdx] !== arr[secondIdx]) {
      return arr[firstIdx] - arr[secondIdx];
    }
    return firstIdx - secondIdx;
  });

  const monotonicStackOdd = [];
  for (const currentValIdx of originalIndicesForOdd) {
    while (
      monotonicStackOdd.length > 0 &&
      monotonicStackOdd[monotonicStackOdd.length - 1] < currentValIdx
    ) {
      nextJumpOddIndexMap[monotonicStackOdd.pop()] = currentValIdx;
    }
    monotonicStackOdd.push(currentValIdx);
  }

  const originalIndicesForEven = Array.from(
    { length: arraySize },
    (_, idx) => idx,
  );
  originalIndicesForEven.sort((firstIdxElement, secondIdxElement) => {
    if (arr[firstIdxElement] !== arr[secondIdxElement]) {
      return arr[secondIdxElement] - arr[firstIdxElement];
    }
    return firstIdxElement - secondIdxElement;
  });

  const monotonicStackEven = [];
  for (const currentElementIndex of originalIndicesForEven) {
    while (
      monotonicStackEven.length > 0 &&
      monotonicStackEven[monotonicStackEven.length - 1] < currentElementIndex
    ) {
      nextJumpEvenIndexMap[monotonicStackEven.pop()] = currentElementIndex;
    }
    monotonicStackEven.push(currentElementIndex);
  }

  for (
    let currentPosition = arraySize - 2;
    currentPosition >= 0;
    currentPosition--
  ) {
    const nextOddJumpTarget = nextJumpOddIndexMap[currentPosition];
    const nextEvenJumpTarget = nextJumpEvenIndexMap[currentPosition];

    if (nextOddJumpTarget !== undefined) {
      canReachOddPath[currentPosition] = canReachEvenPath[nextOddJumpTarget];
      if (canReachOddPath[currentPosition]) {
        goodStartCount++;
      }
    }

    if (nextEvenJumpTarget !== undefined) {
      canReachEvenPath[currentPosition] = canReachOddPath[nextEvenJumpTarget];
    }
  }

  return goodStartCount;
};
