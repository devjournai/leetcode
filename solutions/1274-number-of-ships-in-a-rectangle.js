/**
 * Number Of Ships In A Rectangle
 * Intuition: Quadtree the sea: if hasShips is false the rectangle is empty; a 1x1 with ships is one ship; otherwise split into four quadrants and sum.
 * Approach: 1. Return 0 on invalid bounds or !hasShips. 2. If bottom-left equals top-right, return 1. 3. Recurse on four mid-split rectangles. 4. Sum the four counts.
 * Dry Run: One ship at (1,1), query [0,0]-[4,4]
 *   hasShips true, split until the cell (1,1) returns 1 and empty quadrants 0. Total 1.
 * Time Complexity: O(S * log(max(W, H)))
 * Space Complexity: O(log(max(W, H)))
 */
var countShips = function (seaInstance, topRightCorner, bottomLeftCorner) {
  const topXCoordinate = topRightCorner[0];
  const topYCoordinate = topRightCorner[1];
  const bottomXCoordinate = bottomLeftCorner[0];
  const bottomYCoordinate = bottomLeftCorner[1];

  if (
    bottomXCoordinate > topXCoordinate ||
    bottomYCoordinate > topYCoordinate ||
    !seaInstance.hasShips(topRightCorner, bottomLeftCorner)
  ) {
    return 0;
  }

  if (
    bottomXCoordinate === topXCoordinate &&
    bottomYCoordinate === topYCoordinate
  ) {
    return 1;
  }

  const midpointHorizontal = Math.floor(
    (bottomXCoordinate + topXCoordinate) / 2
  );
  const midpointVertical = Math.floor((bottomYCoordinate + topYCoordinate) / 2);

  const shipsInBottomLeft = countShips(
    seaInstance,
    [midpointHorizontal, midpointVertical],
    [bottomXCoordinate, bottomYCoordinate]
  );
  const shipsInBottomRight = countShips(
    seaInstance,
    [topXCoordinate, midpointVertical],
    [midpointHorizontal + 1, bottomYCoordinate]
  );
  const shipsInTopLeft = countShips(
    seaInstance,
    [midpointHorizontal, topYCoordinate],
    [bottomXCoordinate, midpointVertical + 1]
  );
  const shipsInTopRight = countShips(
    seaInstance,
    [topXCoordinate, topYCoordinate],
    [midpointHorizontal + 1, midpointVertical + 1]
  );

  const totalFoundShips =
    shipsInBottomLeft + shipsInBottomRight + shipsInTopLeft + shipsInTopRight;

  return totalFoundShips;
};
