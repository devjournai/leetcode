/**
 * Extract Kth Character From The Rope Tree
 * Intuition: Recursively navigate the rope tree. For an internal node, determine if the Kth character is in the left or right child's string by comparing K with the left child's total string length. For a leaf node, directly access the character from its string value.
 * Approach: 1. Base case: If the current node is a leaf (no children), return the (K-1)th character from its `val` string. 2. Recursive step: For an internal node, calculate the total length of the string represented by its left child. This length is `leftNode.val.length` if `leftNode` is a leaf (checked by `leftNode.len === 0`), or `leftNode.len` if `leftNode` is an internal node. 3. If K is less than or equal to this left child's length, recurse on the left child with the original K. 4. Otherwise, recurse on the right child, adjusting K by subtracting the left child's length.
 * Dry Run:
 *   root = {len: 5, val: "", left: L, right: R}
 *   L = {len: 0, val: "abc", left: null, right: null}
 *   R = {len: 0, val: "de", left: null, right: null}
 *   k = 4
 *
 *   getKthCharacter(root, 4):
 *     - mainRoot is 'root'. mainRoot.left (L) and mainRoot.right (R) are not null. Not a leaf.
 *     - mainRoot.left is 'L'.
 *       - L.len is 0. So L is a leaf.
 *       - currentLeftLength = L.val.length = "abc".length = 3.
 *     - currentKth (4) <= currentLeftLength (3) is false.
 *     - Else branch:
 *       - adjustedKth = 4 - 3 = 1.
 *       - Call getKthCharacter(mainRoot.right (R), 1).
 *
 *   getKthCharacter(R, 1):
 *     - mainRoot is 'R'. mainRoot.left is null and mainRoot.right is null. It's a leaf.
 *     - Return mainRoot.val[1 - 1] = R.val[0] = "de"[0] = 'd'.
 *
 *   Result: 'd'
 * Time Complexity: O(H)
 * Space Complexity: O(H)
 */
var getKthCharacter = function (mainRoot, targetKth) {
  if (mainRoot.left === null && mainRoot.right === null) {
    return mainRoot.val[targetKth - 1];
  }

  let lengthLeftSubtree;

  if (mainRoot.left !== null) {
    if (mainRoot.left.len === 0) {
      lengthLeftSubtree = mainRoot.left.val.length;
    } else {
      lengthLeftSubtree = mainRoot.left.len;
    }
  } else {
    lengthLeftSubtree = 0;
  }

  if (targetKth <= lengthLeftSubtree) {
    return getKthCharacter(mainRoot.left, targetKth);
  } else {
    let remainingKth = targetKth - lengthLeftSubtree;
    return getKthCharacter(mainRoot.right, remainingKth);
  }
};
