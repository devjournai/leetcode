/**
 * Median of a Binary Search Tree Level
 * Intuition: We notice that the problem requires us to find the median of node values at a certain level in a binary search tree. Since the definition of median is to sort the node values and take the middle value, and the in-order traversal of a binary search tree is inherently sorted, we can collect the node values at the specified level through in-order traversal. We define a helper function $\text{dfs}(root, i)$, where $root$ is the current node and $i$ is the level of the current node. In the function, if the current node is empty, we return directly. Otherwise, we recursively traverse the left subtree, check if the level of the current node equals the target level, and if so, add the value of the current node to the result list, and finally recursively traverse the right subtree. We initialize an empty list $\text{nums}$ to store the node values at the specified level, and call $\text{dfs}(root...
 * Approach: We notice that the problem requires us to find the median of node values at a certain level in a binary search tree. Since the definition of median is to sort the node values and take the middle value, and the in-order traversal of a binary search tree is inherently sorted, we can collect the node values at the specified level through in-order traversal. We define a helper function $\text{dfs}(root, i)$, where $root$ is the current node and $i$ is the level of the current node. In the function, if the current node is empty, we return directly. Otherwise, we recursively traverse the left subtree, check if the level of the current node equals the target level, and if so, add the value of the current node to the result list, and finally recursively traverse the right subtree. We initialize an empty list $\text{nums}$ to store the node values at the specified level, and call $\text{dfs}(root...
 * Dry Run: Input: root = [4,null,5,null,7], level = 2 => Output: 7
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
/**
 * Definition for a binary tree node.
 * var TreeNode = function () {

};

 */
var levelMedian = function (root, level) {
  const nums = [];

  const dfs = (node, i) => {
    if (node === null) {
      return;
    }
    dfs(node.left, i + 1);
    if (i === level) {
      nums.push(node.val);
    }
    dfs(node.right, i + 1);
  };

  dfs(root, 0);
  if (nums.length === 0) {
    return -1;
  }
  return nums[nums.length >> 1];
};
