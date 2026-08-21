/**
 * Logical Or Of Two Binary Grids Represented As Quad Trees
 * Intuition: OR of two quad trees: a leaf of 1 dominates (whole quadrant is 1); a leaf of 0 defers to the other tree. Otherwise recurse on four children and collapse to a leaf if all four become the same-valued leaves.
 * Approach: 1. If tree1 is a leaf, return it if val else tree2. 2. If tree2 is a leaf, return it if val else tree1. 3. Recurse on all four child pairs. 4. If all children are leaves with equal val, return one leaf. 5. Else return an internal node with those children.
 * Dry Run: Both trees are 2x2 mixed leaves; OR of corresponding leaves yields four 1-leaves → collapse to a single true leaf.
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
    quadTree2.bottomRight
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
    childBottomRight
  );
};
