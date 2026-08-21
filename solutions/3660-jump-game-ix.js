/**
 * Jump Game IX
 * Intuition: Indices that interact through a decreasing-max stack share a DSU component whose stored max is the answer for every member.
 * Approach: 1. DSU with maxVal per root. 2. Scan left to right with a stack of (component max, root). While the top max_val > nums[i], pop and union into i; keep the first popped max as the new stack max. 3. Push i. 4. Answer[i] = maxVal[find(i)].
 * Dry Run: nums = [3, 1, 2]. At 1, pop 3 (3>1), union 0-1, push max 3. At 2, stack top 3>2 so union 2 with 1. All share max 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxValue = function (nums) {
  const n = nums.length;
  const parent = new Array(n);
  const maxVal = new Array(n);

  for (let i = 0; i < n; i++) {
    parent[i] = i;
    maxVal[i] = nums[i];
  }

  function find(i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  }

  function union(i, j) {
    let rootI = find(i);
    let rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      maxVal[rootJ] = Math.max(maxVal[rootI], maxVal[rootJ]);
    }
  }

  let stack = [];

  for (let i = 0; i < n; i++) {
    let currentMax = nums[i];
    let poppedCount = 0;
    while (stack.length > 0 && stack[stack.length - 1].max_val > nums[i]) {
      let comp = stack.pop();
      union(i, comp.root_idx);

      if (poppedCount === 0) {
        currentMax = Math.max(currentMax, comp.max_val);
      }
      poppedCount++;
    }

    stack.push({ max_val: currentMax, root_idx: i });
  }

  const ans = new Array(n);
  for (let i = 0; i < n; i++) {
    ans[i] = maxVal[find(i)];
  }

  return ans;
};
