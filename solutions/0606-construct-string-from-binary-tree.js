/**
 * Construct String From Binary Tree
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
