/**
 * Odd Even Jump
 * Intuition: Odd jumps go to the least larger-or-equal later index; even jumps to the greatest smaller-or-equal. Precompute next indices with sorted order + monotonic stacks, then DP from the right.
 * Approach: 1. Last index is good for both parities; `goodStartCount = 1`. 2. Sort indices ascending for odd next, descending for even next; stack pops smaller indices. 3. For i from n-2 down: odd-good if even-good at next odd jump; even-good if odd-good at next even jump. 4. Count odd-good starts.
 * Dry Run: arr = [10,13,12,14,13]. Index 0 odd-jumps to 2 (12), even from 2 to 3, odd from 3 done. Several starts reach the end. Answer 2.
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
    (_, idx) => idx
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
    (_, idx) => idx
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
