/**
 * Alternating Groups I
 * Intuition: An alternating group of size 3 is a circular triple whose middle color differs from both neighbors.
 * Approach: 1. For each index i, compare colors[i] with colors[(i-1) mod n] and colors[(i+1) mod n]. 2. Count positions where both neighbors differ from the center.
 * Dry Run:
 *   colors = [0, 1, 0, 0, 1]
 *   Index 0: neighbors 1 and 1, center 0 differs from both -> count.
 *   Index 1: neighbors 0 and 0, center 1 differs from both -> count.
 *   Index 2: neighbors 1 and 0, center 0 equals right -> skip.
 *   Index 3: neighbors 0 and 1, center 0 equals left -> skip.
 *   Index 4: neighbors 0 and 0, center 1 differs from both -> count. Answer 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numberOfAlternatingGroups = function (colors) {
  const colorCount = colors.length;
  let alternatingGroupCount = 0;

  for (let currentIndex = 0; currentIndex < colorCount; currentIndex++) {
    const previousColor = colors[(currentIndex - 1 + colorCount) % colorCount];
    const nextColor = colors[(currentIndex + 1) % colorCount];
    if (
      colors[currentIndex] !== previousColor &&
      colors[currentIndex] !== nextColor
    ) {
      alternatingGroupCount++;
    }
  }

  return alternatingGroupCount;
};
