/**
 * Count Items Matching A Rule
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countMatches = function (items, ruleKey, ruleValue) {
  const propertyLookup = { type: 0, color: 1, name: 2 };
  const comparisonIndex = propertyLookup[ruleKey];
  let totalMatches = 0;

  for (
    let currentItemIdx = 0;
    currentItemIdx < items.length;
    currentItemIdx++
  ) {
    const currentItemData = items[currentItemIdx];
    if (currentItemData[comparisonIndex] === ruleValue) {
      totalMatches++;
    }
  }

  return totalMatches;
};
