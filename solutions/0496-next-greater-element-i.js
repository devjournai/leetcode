/**
 * Next Greater Element I
 * Intuition: Scan nums2 left to right with a decreasing stack. When a new value is larger, it is the next greater for every popped smaller top. Map those answers, then look up each nums1 query.
 * Approach: 1. For each `currentElement` in nums2, while stack top < it, pop and `nextGreaterMappings.set(popped, current)`. Push current. 2. Remaining stack entries map to -1. 3. `nums1.map` through the map.
 * Dry Run: nums1 = [4,1,2], nums2 = [1,3,4,2].
 *   - 1 push. 3 pops 1→3. 4 pops 3→4. 2 push. Leftover 4,-1 and 2,-1. Lookups: 4→-1, 1→3, 2→-1.
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var nextGreaterElement = function (nums1, nums2) {
  const nextGreaterMappings = new Map();
  const decreasingStack = [];

  for (
    let currentIterator = 0;
    currentIterator < nums2.length;
    currentIterator++
  ) {
    let currentElement = nums2[currentIterator];
    while (
      decreasingStack.length > 0 &&
      currentElement > decreasingStack[decreasingStack.length - 1]
    ) {
      let poppedValue = decreasingStack.pop();
      nextGreaterMappings.set(poppedValue, currentElement);
    }
    decreasingStack.push(currentElement);
  }

  while (decreasingStack.length > 0) {
    let remainingElement = decreasingStack.pop();
    nextGreaterMappings.set(remainingElement, -1);
  }

  const finalAnswer = nums1.map((queryNumber) => {
    return nextGreaterMappings.get(queryNumber);
  });

  return finalAnswer;
};
