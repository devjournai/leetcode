/**
 * Nested List Weight Sum
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
                segmentAggregate += computeNestedSum(listItem.getList(), deeperLevelDepth);
            }
        }
        return segmentAggregate;
    }

    let startDepth = 1;
    return computeNestedSum(nestedList, startDepth);
};