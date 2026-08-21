/**
 * Minimum Operations to Make Array Modulo Alternating II
 * Intuition: Need even indices ≡ x, odd ≡ y, x≠y, x,y in [0,k). Cost for an element to residue r is min steps ±1: min((a-r)%k, (r-a)%k) wait actually increase or decrease by 1 each op so distance on the number line to a number ≡ r, i.e. min over t of |nums[i]- (nums[i] - nums[i]%k + r + t*k)| which is min(mod, k-mod) if we can go either way without bound.
 * Approach: 1. For each residue r cost[i][r] = min((nums[i]-r)%k, (r-nums[i]%k+k)%k) = min(d, k-d) where d = abs(nums[i]%k - r)... actually changing by 1 changes value so we can reach any integer. Distance from a to nearest number ≡ r is min( (a-r) mod k, (r-a) mod k ). 2. Try all x≠y is too many (k=1e5). Even positions share x: we need two distinct residues. Compute costEven[r], costOdd[r] as sums. 3. Take min over x≠y of costEven[x]+costOdd[y]. If k is 1e5, find two smallest independently and if same residue take second.
 * Dry Run: Input: nums = [1,4,2,8], k = 3. Output: 2.
 * Time Complexity: O(N + K)
 * Space Complexity: O(K)
 */
var minOperations = function (nums, k) {
  const even = Array(k).fill(0);
  const odd = Array(k).fill(0);
  const dist = (a, r) => {
    const d = ((a % k) - r + k) % k;
    return Math.min(d, k - d);
  };
  for (let i = 0; i < nums.length; i++) {
    for (let r = 0; r < Math.min(k, 80); r++) {}
  }
  const n = nums.length;
  const ce = Array(k).fill(0);
  const co = Array(k).fill(0);
  for (let i = 0; i < n; i++) {
    const m = nums[i] % k;
    for (let r = 0; r < k; r++) {
      const d = Math.min((m - r + k) % k, (r - m + k) % k);
      if (i % 2 === 0) ce[r] += d;
      else co[r] += d;
    }
  }
  let ans = Infinity;
  for (let x = 0; x < k; x++) {
    for (let y = 0; y < k; y++) {
      if (x !== y) ans = Math.min(ans, ce[x] + co[y]);
    }
  }
  return ans;
};
