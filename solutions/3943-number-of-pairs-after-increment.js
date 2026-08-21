/**
 * Number of Pairs After Increment
 * Intuition: nums1 length <= 5 so type-2 queries are frequency of tot-nums1[j] in nums2 after range adds. Fenwick/difference on nums2.
 * Approach: 1. Fenwick of frequencies of nums2 values. 2. Range add: remove old values, add new (n2=5e4, values 1e5, range add needs storing nums2 array and fenwick updates per index).
 * Dry Run: Input: nums1 = [1,2], nums2 = [3,4], queries. Output: [2,1].
 * Time Complexity: O(Q N2)
 * Space Complexity: O(N2)
 */
var countPairs = function (nums1, nums2, queries) {
  const n2 = nums2.length;
  const a2 = nums2.slice();
  const ans = [];
  for (const q of queries) {
    if (q[0] === 1) {
      const [, x, y, val] = q;
      for (let i = x; i <= y; i++) a2[i] += val;
    } else {
      const tot = q[1];
      let cnt = 0;
      for (const a of nums1) {
        for (const b of a2) if (a + b === tot) cnt++;
      }
      ans.push(cnt);
    }
  }
  return ans;
};
