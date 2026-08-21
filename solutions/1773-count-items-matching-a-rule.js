/**
 * Count Items Matching A Rule
 * Intuition: Each item is [type, color, name]. Map `ruleKey` to that index and count rows whose field equals `ruleValue`.
 * Approach: 1. `propertyLookup` maps type/color/name to 0/1/2. 2. Scan items; if `currentItemData[comparisonIndex] === ruleValue`, increment `totalMatches`. 3. Return the count.
 * Dry Run: items = [["phone","blue","pixel"],["computer","silver","lenovo"]], ruleKey = "color", ruleValue = "silver".
 *   - Index 1: "blue" miss, "silver" hit → 1.
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
