/**
 * Find Center Of Star Graph
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
