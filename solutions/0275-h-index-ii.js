/**
 * H Index II
 * Intuition: Citations are already sorted, so the h-index is the smallest index i where citations[i] >= n - i. Binary search finds the leftmost such i.
 * Approach: 1. Binary-search [0, n-1]. 2. At mid, papersFromMid = n - mid. 3. If citations[mid] >= papersFromMid, search left (a smaller i may still work); else search right. 4. Return n - firstPointer.
 * Dry Run: citations = [0,1,3,5,6], n = 5.
 *   - mid=2: 3 >= 3 → last=1. mid=0: 0 < 5 → first=1. mid=1: 1 < 4 → first=2.
 *   - Return 5 - 2 = 3.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var hIndex = function (citations) {
  let firstPointer = 0;
  let lastPointer = citations.length - 1;
  const numberOfPapers = citations.length;

  while (firstPointer <= lastPointer) {
    const midPoint = Math.floor((firstPointer + lastPointer) / 2);
    const papersFromMid = numberOfPapers - midPoint;

    if (citations[midPoint] >= papersFromMid) {
      lastPointer = midPoint - 1;
    } else {
      firstPointer = midPoint + 1;
    }
  }

  return numberOfPapers - firstPointer;
};
