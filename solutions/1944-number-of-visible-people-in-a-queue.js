/**
 * Number Of Visible People In A Queue
 * Intuition: Person `i` looks right and sees decreasing heights until someone taller or equal blocks the rest. A decreasing monotonic stack of people to the right records who is still visible: popping shorter people counts them, then the next remaining person is also visible.
 * Approach: 1. Scan from right to left with an empty stack of heights. 2. While the top is shorter than the current person, pop and increment `visibleCounts[i]`. 3. If the stack is still nonempty, increment once more (the next blocker). 4. Push the current height.
 * Dry Run: heights = [10, 6, 8, 5, 11, 9].
 *   - Index 4 (11): sees 9 → 1
 *   - Index 0 (10): pops 6,8,5 then sees 11 → 3. Typical answer [3,1,2,1,1,0].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var canSeePersonsCount = function (personHeights) {
  const totalPersons = personHeights.length;
  const visibleCounts = new Array(totalPersons).fill(0);
  const monotonicStack = [];

  for (
    let currentPersonIndex = totalPersons - 1;
    currentPersonIndex >= 0;
    currentPersonIndex--
  ) {
    while (
      monotonicStack.length > 0 &&
      personHeights[currentPersonIndex] >
        monotonicStack[monotonicStack.length - 1]
    ) {
      monotonicStack.pop();
      visibleCounts[currentPersonIndex]++;
    }
    if (monotonicStack.length > 0) {
      visibleCounts[currentPersonIndex]++;
    }
    monotonicStack.push(personHeights[currentPersonIndex]);
  }

  return visibleCounts;
};
