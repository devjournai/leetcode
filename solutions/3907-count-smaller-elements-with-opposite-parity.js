/**
 * Count Smaller Elements With Opposite Parity
 * Intuition: We can use two ordered lists (or Binary Indexed Trees) to separately maintain even and odd elements. For each element, we query the number of smaller elements in the other list, and then add the current element to its corresponding list.
 * Approach: 1. Follow Ordered List or Binary Indexed Tree. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [5,2,4,1,3]. Output: [2,1,2,0,0].
 * Time Complexity: O(n * logn)
 * Space Complexity: O(n)
 */
class BIT {
  constructor(n) {
    this.c = new Int32Array(n + 1);
  }
  update(x, delta) {
    for (; x <= this.n; x += x & -x) this.c[x] += delta;
  }
  query(x) {
    let s = 0;
    for (; x > 0; x -= x & -x) s += this.c[x];
    return s;
  }
}

var countSmallerOppositeParity = function (nums) {
  const n = nums.length;
  const sorted = _.sortedUniq(_.sortBy(nums));
  const m = sorted.length;

  const bits = [new BIT(m), new BIT(m)];
  const ans = new Array(n);

  for (let i = n - 1; i >= 0; i--) {
    const rank = _.sortedIndex(sorted, nums[i]) + 1;
    ans[i] = bits[(nums[i] & 1) ^ 1].query(rank - 1);
    bits[nums[i] & 1].update(rank, 1);
  }
  return ans;
};
