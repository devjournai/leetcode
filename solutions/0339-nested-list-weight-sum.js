/**
 * Nested List Weight Sum
 * Intuition: An integer contributes value * depth; a nested list is the same sum at depth + 1. Recurse over each NestedInteger.
 * Approach: 1. computeNestedSum walks the current list at currentSegmentDepth. 2. If isInteger, add getInteger() * depth. 3. Else add the recursive sum of getList() at depth + 1. 4. Start at depth 1.
 * Dry Run: nestedList = [[1, 1], 2, [1, 1]].
 *   - Inner 1s at depth 2 contribute 2 each; the 2 at depth 1 contributes 2. Total 10.
 * Time Complexity: O(N)
 * Space Complexity: O(D)
 */
var depthSum = function (nestedList) {
  function computeNestedSum(currentListSegment, currentSegmentDepth) {
    let segmentAggregate = 0;
    for (const listItem of currentListSegment) {
      if (listItem.isInteger()) {
        segmentAggregate += listItem.getInteger() * currentSegmentDepth;
      } else {
        let deeperLevelDepth = currentSegmentDepth + 1;
        segmentAggregate += computeNestedSum(
          listItem.getList(),
          deeperLevelDepth
        );
      }
    }
    return segmentAggregate;
  }

  let startDepth = 1;
  return computeNestedSum(nestedList, startDepth);
};
