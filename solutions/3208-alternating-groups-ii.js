/**
 * Alternating Groups II
 * Intuition: Count circular windows of length k whose colors strictly alternate. Track the length of the current alternating run while wrapping around k-1 extra steps.
 * Approach: 1. Walk n + k - 2 steps on the circular array. 2. Reset the run length to 1 on a repeated color, otherwise increment it. 3. Every time the run length reaches k, count a group.
 * Dry Run:
 *   colors = [0, 1, 0, 1, 0], k = 3
 *   Alternating run grows 1,2,3,4,5 then wrap keeps alternating; windows of length 3 all alternate -> 5 groups.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numberOfAlternatingGroups = function (colors, k) {
  const colorCount = colors.length;
  let alternatingGroupCount = 0;
  let alternatingRunLength = 1;

  for (let stepIndex = 0; stepIndex < colorCount + k - 2; stepIndex++) {
    const currentColor = colors[stepIndex % colorCount];
    const previousColor = colors[(stepIndex - 1 + colorCount) % colorCount];
    alternatingRunLength =
      currentColor === previousColor ? 1 : alternatingRunLength + 1;
    if (alternatingRunLength >= k) {
      alternatingGroupCount++;
    }
  }

  return alternatingGroupCount;
};
