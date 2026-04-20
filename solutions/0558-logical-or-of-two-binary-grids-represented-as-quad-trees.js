/**
 * Logical Or Of Two Binary Grids Represented As Quad Trees
 * Time Complexity: O(N1 + N2)
 * Space Complexity: O(H1 + H2 + N_result)
 */
var intersect = function (quadTree1, quadTree2) {
  if (quadTree1.isLeaf) {
    return quadTree1.val ? quadTree1 : quadTree2;
  }

  if (quadTree2.isLeaf) {
    return quadTree2.val ? quadTree2 : quadTree1;
  }

  const childTopLeft = intersect(quadTree1.topLeft, quadTree2.topLeft);
  const childTopRight = intersect(quadTree1.topRight, quadTree2.topRight);
  const childBottomLeft = intersect(quadTree1.bottomLeft, quadTree2.bottomLeft);
  const childBottomRight = intersect(
    quadTree1.bottomRight,
    quadTree2.bottomRight,
  );

  if (
    childTopLeft.isLeaf &&
    childTopRight.isLeaf &&
    childBottomLeft.isLeaf &&
    childBottomRight.isLeaf &&
    childTopLeft.val === childTopRight.val &&
    childTopRight.val === childBottomLeft.val &&
    childBottomLeft.val === childBottomRight.val
  ) {
    return new _Node(childTopLeft.val, true, null, null, null, null);
  }

  return new _Node(
    false,
    false,
    childTopLeft,
    childTopRight,
    childBottomLeft,
    childBottomRight,
  );
};
