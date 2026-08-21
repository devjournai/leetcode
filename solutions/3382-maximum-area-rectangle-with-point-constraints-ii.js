/**
 * Maximum Area Rectangle With Point Constraints II
 * Intuition: Sort points by x then y. Consecutive points on the same vertical line are candidate right edges. The last seen x for those two y-values is the left edge iff no point sits strictly between the y's at a larger x (segment-tree max-x query).
 * Approach: 1. Pair (x, y), sort, compress unique y. 2. Segment tree stores the latest x at each y. 3. For each adjacent pair on the same x, if both y's last appeared at the same left x and that left x is strictly greater than max x between their y-indices, the rectangle is empty. 4. Then record the previous point's x in the tree.
 * Dry Run: x = [1,1,3,3], y = [1,3,1,3]. After left column (1,1)-(1,3), tree holds those x=1 values. Right column (3,1)-(3,3) sees matching left x=1 and empty interior → area 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var maxRectangleArea = function (xCoord, yCoord) {
  const pointCount = xCoord.length;
  const points = [];
  for (let index = 0; index < pointCount; index++) {
    points.push([xCoord[index], yCoord[index]]);
  }
  points.sort((leftPoint, rightPoint) =>
    leftPoint[0] !== rightPoint[0]
      ? leftPoint[0] - rightPoint[0]
      : leftPoint[1] - rightPoint[1]
  );

  const uniqueYs = Array.from(new Set(yCoord)).sort(
    (leftY, rightY) => leftY - rightY
  );
  const yToIndex = new Map();
  for (let index = 0; index < uniqueYs.length; index++) {
    yToIndex.set(uniqueYs[index], index);
  }

  const invalidValue = -1;
  const segmentTree = new Array(uniqueYs.length * 4).fill(invalidValue);

  const mergeMax = (leftValue, rightValue) => Math.max(leftValue, rightValue);

  const updateTree = (
    treeIndex,
    rangeLow,
    rangeHigh,
    updateIndex,
    updateValue
  ) => {
    if (rangeLow === rangeHigh) {
      segmentTree[treeIndex] = updateValue;
      return;
    }
    const midIndex = Math.floor((rangeLow + rangeHigh) / 2);
    if (updateIndex <= midIndex) {
      updateTree(
        treeIndex * 2 + 1,
        rangeLow,
        midIndex,
        updateIndex,
        updateValue
      );
    } else {
      updateTree(
        treeIndex * 2 + 2,
        midIndex + 1,
        rangeHigh,
        updateIndex,
        updateValue
      );
    }
    segmentTree[treeIndex] = mergeMax(
      segmentTree[treeIndex * 2 + 1],
      segmentTree[treeIndex * 2 + 2]
    );
  };

  const queryTree = (treeIndex, rangeLow, rangeHigh, queryLeft, queryRight) => {
    if (queryLeft > queryRight) {
      return invalidValue;
    }
    if (queryLeft <= rangeLow && rangeHigh <= queryRight) {
      return segmentTree[treeIndex];
    }
    if (queryRight < rangeLow || rangeHigh < queryLeft) {
      return invalidValue;
    }
    const midIndex = Math.floor((rangeLow + rangeHigh) / 2);
    return mergeMax(
      queryTree(treeIndex * 2 + 1, rangeLow, midIndex, queryLeft, queryRight),
      queryTree(
        treeIndex * 2 + 2,
        midIndex + 1,
        rangeHigh,
        queryLeft,
        queryRight
      )
    );
  };

  const lastXByY = new Map();
  let maximumArea = -1;
  let previousX = points[0][0];
  let previousY = points[0][1];

  for (let index = 1; index < points.length; index++) {
    const [currentX, currentY] = points[index];
    if (lastXByY.has(previousY) && lastXByY.has(currentY)) {
      const leftX = lastXByY.get(currentY);
      const previousYIndex = yToIndex.get(previousY);
      const currentYIndex = yToIndex.get(currentY);
      if (
        previousX === currentX &&
        lastXByY.get(previousY) === leftX &&
        leftX >
          queryTree(
            0,
            0,
            uniqueYs.length - 1,
            previousYIndex + 1,
            currentYIndex - 1
          )
      ) {
        maximumArea = Math.max(
          maximumArea,
          (currentY - previousY) * (currentX - leftX)
        );
      }
    }
    lastXByY.set(previousY, previousX);
    updateTree(0, 0, uniqueYs.length - 1, yToIndex.get(previousY), previousX);
    previousX = currentX;
    previousY = currentY;
  }

  return maximumArea;
};
