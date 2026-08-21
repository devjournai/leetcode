/**
 * Sum of Sortable Integers
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: nums = [3,1,2] => Output: 3
 * Time Complexity: O(N * d(N) * K)
 * Space Complexity: O(N)
 */
var sumSortable = function (nums) {
  const n = nums.length;
  const target = nums.slice().sort((a, b) => a - b);
  const isSorted = nums.every((v, i) => v === target[i]);
  let ans = 0;
  const isRotation = (a, b) => {
    if (a.length !== b.length) return false;
    const s = a.join(",") + "," + a.join(",");
    return s.includes(b.join(","));
  };
  for (let k = 1; k <= n; k++) {
    if (n % k !== 0) continue;
    if (isSorted) {
      ans += k;
      continue;
    }
    let ok = true;
    for (let start = 0; start < n && ok; start += k) {
      const block = nums.slice(start, start + k);
      const need = target.slice(start, start + k);
      if (!isRotation(block, need)) ok = false;
    }
    if (ok) ans += k;
  }
  return ans;
};
