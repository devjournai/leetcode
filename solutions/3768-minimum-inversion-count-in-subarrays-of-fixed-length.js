/**
 * Minimum Inversion Count in Subarrays of Fixed Length
 * Intuition: Inversions in a sliding window of length k can be maintained with a Fenwick tree: add the new right value, then drop the leaving left value.
 * Approach: 1. Coordinate-compress nums. 2. Scan i from 0..n-1, add nums[i] and increase the inversion count by how many larger values are already in the window. 3. Once the window has size k, record the count, then remove nums[i-k+1] and subtract inversions it formed with smaller remaining values.
 * Dry Run: nums = [3,1,2,5,4], k = 3. Windows have 2, 0, and 1 inversions; the minimum is 0.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
function BIT(n) {
  this.bit = Array(n + 1).fill(0);
}
BIT.prototype.add = function (i, val) {
  i++;
  while (i < this.bit.length) {
    this.bit[i] += val;
    i += i & -i;
  }
};
BIT.prototype.query = function (i) {
  i++;
  let ret = 0;
  while (i > 0) {
    ret += this.bit[i];
    i -= i & -i;
  }
  return ret;
};

var minInversionCount = function (nums, k) {
  const unique = [...new Set(nums)].sort((a, b) => a - b);
  const valToIdx = new Map(unique.map((x, i) => [x, i]));
  const bit = new BIT(unique.length);
  let result = Infinity;
  let cnt = 0;
  for (let i = 0; i < nums.length; i++) {
    const idx = valToIdx.get(nums[i]);
    cnt += bit.query(unique.length - 1) - bit.query(idx);
    bit.add(idx, 1);
    if (i - (k - 1) < 0) {
      continue;
    }
    result = Math.min(result, cnt);
    const left = valToIdx.get(nums[i - (k - 1)]);
    bit.add(left, -1);
    cnt -= bit.query(left - 1);
  }
  return result;
};
