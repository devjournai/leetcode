/**
 * Path In Zigzag Labelled Binary Tree
 * Intuition: Zigzag levels reverse label order versus a normal heap. The parent of label x on a zigzag level is the parent of its symmetric counterpart (levelMin+levelMax−x), which is that value/2.
 * Approach: 1. While label≥1, prepend it. 2. Level = floor(log2(label)); min=2^level, max=2^{level+1}−1. 3. Parent = floor((min+max−label)/2). 4. Return the path.
 * Dry Run: label=14. Code walks 14→4→3→1 (parent = floor((levelMin+levelMax−label)/2)) → [1,3,4,14].
 * Time Complexity: O(log(initialLabel))
 * Space Complexity: O(log(initialLabel))
 */
var pathInZigZagTree = function (initialLabel) {
  const pathLabels = [];
  let currentLabel = initialLabel;

  while (currentLabel >= 1) {
    pathLabels.unshift(currentLabel);
    const currentLevelValue = Math.floor(Math.log2(currentLabel));

    const minimumValueForLevel = 1 << currentLevelValue;
    const maximumValueForLevel = (1 << (currentLevelValue + 1)) - 1;

    currentLabel = Math.floor(
      (minimumValueForLevel + maximumValueForLevel - currentLabel) / 2
    );
  }

  return pathLabels;
};
