/**
 * Zigzag Level Sum of Binary Tree
 * Intuition: We use a queue q to perform a level-order traversal, and define a boolean variable left to indicate the traversal direction of the current level. For each level, we first add the nodes of the next level to the queue nq, and then compute the sum of the node values of the current level, denoted by s, according to the value of left, and append s to the answer array. Finally, we update the value of left and assign nq to q to continue traversing the next level.
 * Approach: 1. Follow BFS. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: root = [5,2,8,1,null,9,6]. Output: [5,8,0].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var zigzagLevelSum = function (root) {
  let q = [root];
  const ans = [];
  let left = true;
  while (q.length > 0) {
    const nq = [];
    for (const { left, right } of q) {
      if (left !== null) {
        nq.push(left);
      }
      if (right !== null) {
        nq.push(right);
      }
    }
    const m = q.length;
    let s = 0;
    for (let i = 0; i < m; i++) {
      const node = left ? q[i] : q[m - i - 1];
      const child = left ? node.left : node.right;
      if (child === null) {
        break;
      }
      s += node.val;
    }
    ans.push(s);
    left = !left;
    q = nq;
  }
  return ans;
};
