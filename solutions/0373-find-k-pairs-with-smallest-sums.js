/**
 * Find K Pairs With Smallest Sums
 * Intuition: The smallest pair is (nums1[0], nums2[0]); each popped pair (i,j) can grow to (i+1,j) or (i,j+1), so a min-heap plus a visited-index set explores the k smallest like Dijkstra on a sorted grid.
 * Approach: 1. Empty if either array or k is 0. 2. Enqueue [sum,0,0] and mark "0,0". 3. k times: dequeue the min sum, push the values, then enqueue unused (i+1,j) and (i,j+1) with their sums.
 * Dry Run: nums1 = [1,7], nums2 = [3,4], k = 3. Heap (1+3) → pop [1,3], push (7,3) and (1,4); next [1,4] then [7,3] → [[1,3],[1,4],[7,3]].
 * Time Complexity: O(k log k)
 * Space Complexity: O(k)
 */
var kSmallestPairs = function (nums1, nums2, k) {
  const numOneLength = nums1.length;
  const numTwoLength = nums2.length;

  const minHeap = new PriorityQueue(
    (elementA, elementB) => elementA[0] - elementB[0]
  );
  const finalResult = [];
  const visitedSet = new Set();

  if (numOneLength === 0 || numTwoLength === 0 || k === 0) {
    return finalResult;
  }

  const firstPairSum = nums1[0] + nums2[0];
  const initialIndexOne = 0;
  const initialIndexTwo = 0;
  const initialKeyIdentifier = `${initialIndexOne},${initialIndexTwo}`;

  minHeap.enqueue([firstPairSum, initialIndexOne, initialIndexTwo]);
  visitedSet.add(initialKeyIdentifier);

  for (
    let currentIterationCount = 0;
    currentIterationCount < k && !minHeap.isEmpty();
    currentIterationCount++
  ) {
    const dequeuedElement = minHeap.dequeue();
    const currentPairSumValue = dequeuedElement[0];
    const currentIdxOnePosition = dequeuedElement[1];
    const currentIdxTwoPosition = dequeuedElement[2];

    finalResult.push([
      nums1[currentIdxOnePosition],
      nums2[currentIdxTwoPosition],
    ]);

    const nextPotentialIdxOneAdvance = currentIdxOnePosition + 1;
    const keyForFirstAdvance = `${nextPotentialIdxOneAdvance},${currentIdxTwoPosition}`;

    if (
      nextPotentialIdxOneAdvance < numOneLength &&
      !visitedSet.has(keyForFirstAdvance)
    ) {
      const sumForFirstAdvance =
        nums1[nextPotentialIdxOneAdvance] + nums2[currentIdxTwoPosition];
      minHeap.enqueue([
        sumForFirstAdvance,
        nextPotentialIdxOneAdvance,
        currentIdxTwoPosition,
      ]);
      visitedSet.add(keyForFirstAdvance);
    }

    const nextPotentialIdxTwoAdvance = currentIdxTwoPosition + 1;
    const keyForSecondAdvance = `${currentIdxOnePosition},${nextPotentialIdxTwoAdvance}`;

    if (
      nextPotentialIdxTwoAdvance < numTwoLength &&
      !visitedSet.has(keyForSecondAdvance)
    ) {
      const sumForSecondAdvance =
        nums1[currentIdxOnePosition] + nums2[nextPotentialIdxTwoAdvance];
      minHeap.enqueue([
        sumForSecondAdvance,
        currentIdxOnePosition,
        nextPotentialIdxTwoAdvance,
      ]);
      visitedSet.add(keyForSecondAdvance);
    }
  }

  return finalResult;
};
