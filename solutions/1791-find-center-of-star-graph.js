/**
 * Find Center Of Star Graph
 * Intuition: Every edge touches the center, so the node shared by the first two edges is the star center.
 * Approach: 1. Read `primaryEdge` and `secondaryEdge`. 2. If `nodeIdentifierA` equals C or D, return A. 3. Otherwise return B.
 * Dry Run: edges = [[1,2],[2,3],[4,2]].
 *   - First two share 2 → 2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var findCenter = function (edges) {
  const primaryEdge = edges[0];
  const secondaryEdge = edges[1];

  const nodeIdentifierA = primaryEdge[0];
  const nodeIdentifierB = primaryEdge[1];

  const nodeIdentifierC = secondaryEdge[0];
  const nodeIdentifierD = secondaryEdge[1];

  if (
    nodeIdentifierA === nodeIdentifierC ||
    nodeIdentifierA === nodeIdentifierD
  ) {
    return nodeIdentifierA;
  } else {
    return nodeIdentifierB;
  }
};
