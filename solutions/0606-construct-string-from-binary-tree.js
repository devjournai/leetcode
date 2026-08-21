/**
 * Construct String From Binary Tree
 * Intuition: Preorder stringify: value, then optional `(left)` and `(right)`. Empty left is emitted as `()` only when a right child exists so the right subtree is unambiguous; otherwise omit empty children.
 * Approach: 1. If `!t` return `""`. 2. `nodeValueString = String(t.val)`. 3. If `t.left`, `leftChildPart = '(' + tree2str(left) + ')'`; else if `t.right` use `"()"`, else `""`. 4. If `t.right`, wrap `tree2str(right)`, else `""`. 5. Concatenate value + left + right.
 * Dry Run: t = 1 with left 2 (left 4) and right 3.
 *   - 4 → "4". 2 → "2(4)". 3 → "3". Root → "1(2(4))(3)".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var tree2str = function (t) {
  if (!t) {
    return "";
  }

  let nodeValueString = String(t.val);

  let leftChildPart;
  if (t.left) {
    leftChildPart = `(${tree2str(t.left)})`;
  } else {
    if (t.right) {
      leftChildPart = "()";
    } else {
      leftChildPart = "";
    }
  }

  let rightChildPart;
  if (t.right) {
    rightChildPart = `(${tree2str(t.right)})`;
  } else {
    rightChildPart = "";
  }

  return nodeValueString + leftChildPart + rightChildPart;
};
