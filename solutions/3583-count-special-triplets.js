/**
 * Count Special Triplets
 * Intuition: A special triplet is i < j < k with nums[i] = nums[k] = 2 * nums[j]. For each middle value, multiply leftover counts of (2*x) on the left and right.
 * Approach: 1. Count all values on the right. 2. Scan left to right: decrement right[x], add left[2x]*right[2x], then increment left[x]. 3. Mod 1e9+7.
 * Dry Run: nums = [6, 3, 6]. At j=1 (3), left has one 6 and right has one 6 → 1 triplet.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var specialTriplets = function (nums) {
  const left = new Map();
  const right = new Map();
  for (const x of nums) {
    right.set(x, (right.get(x) || 0) + 1);
  }

  let answer = 0;
  const MOD = 1e9 + 7;
  for (const x of nums) {
    right.set(x, right.get(x) - 1);
    const twice = x * 2;
    const l = left.get(twice) || 0;
    const r = right.get(twice) || 0;
    answer = (answer + ((l * r) % MOD)) % MOD;
    left.set(x, (left.get(x) || 0) + 1);
  }
  return answer;
};
