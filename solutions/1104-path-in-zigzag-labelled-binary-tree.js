/**
 * Path In Zigzag Labelled Binary Tree
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
      (minimumValueForLevel + maximumValueForLevel - currentLabel) / 2,
    );
  }

  return pathLabels;
};
