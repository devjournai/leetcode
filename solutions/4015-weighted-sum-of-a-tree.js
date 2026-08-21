/**
 * Weighted Sum of a Tree
 * Intuition: The weight of node i is nums[i]  *  (h - d_i + 1), where d_i is the depth of node i and h is the height of the tree. Therefore, the sum of the weights of all nodes is:
 * Approach: The weight of node i is nums[i]  *  (h - d_i + 1), where d_i is the depth of node i and h is the height of the tree. Therefore, the sum of the weights of all nodes is: $sum_{i=0}^{n-1} nums[i]  *  (h - d_i + 1) = h  *  sum_{i=0}^{n-1} nums[i] + sum_{i=0}^{n-1} nums[i]  *  (1 - d_i)$ We can use BFS to traverse the tree level by level. During the traversal, we maintain the current level d (the root is at level 1) and accumulate nums[i]  *  (1 - d) for each node. After the traversal finishes, d equals the height h of the tree, and adding h  *  sum nums[i] gives the answer.
 * Dry Run: Input: parent = [-1,0,0,0,2,2], nums = [5,2,3,1,4,6]. Output: 37.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var weightedSum = function (parent, nums) {
  const n = nums.length;

  const g = Array.from({ length: n }, () => []);

  for (let i = 1; i < n; i++) {
    g[parent[i]].push(i);
  }

  let ans = 0;

  let q = [0];

  let d = 0;

  while (q.length > 0) {
    d++;

    const nq = [];

    for (const i of q) {
      ans += nums[i] * (1 - d);

      for (const son of g[i]) {
        nq.push(son);
      }
    }

    q = nq;
  }

  let sum = 0;
  for (const x of nums) {
    sum += x;
  }

  ans += d * sum;

  return ans;
};
