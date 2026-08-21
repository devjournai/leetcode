/**
 * Maximize Alternating Sum Using Swaps
 * Intuition: Allowed swaps connect indices into components. Values may be rearranged freely inside a component. Alternating sum wants large values on even indices and small values on odd indices.
 * Approach: 1. Union-find on swap pairs. 2. In each component, sort values descending. 3. Assign the largest values to that component's even slots, subtract the rest.
 * Dry Run: nums = [1, 2, 3], swaps link all indices. Two even slots get 3 and 2, odd gets 1 → 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxAlternatingSum = function (nums, swaps) {
  const n = nums.length;
  const parent = Array.from({ length: n }, (_, index) => index);

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  for (const [left, right] of swaps) {
    const rootLeft = find(left);
    const rootRight = find(right);
    if (rootLeft !== rootRight) {
      parent[rootLeft] = rootRight;
    }
  }

  const groups = new Map();
  for (let index = 0; index < n; index++) {
    const root = find(index);
    if (!groups.has(root)) {
      groups.set(root, { indices: [], values: [] });
    }
    const group = groups.get(root);
    group.indices.push(index);
    group.values.push(nums[index]);
  }

  let alternatingSum = 0;
  for (const { indices, values } of groups.values()) {
    values.sort((left, right) => right - left);
    const evenSlots = indices.filter((index) => index % 2 === 0).length;
    for (let i = 0; i < values.length; i++) {
      if (i < evenSlots) {
        alternatingSum += values[i];
      } else {
        alternatingSum -= values[i];
      }
    }
  }
  return alternatingSum;
};
