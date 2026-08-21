/**
 * Find X Value of Array I
 * Intuition: Subarray products modulo k transition by multiplying the new element; count endings at each remainder.
 * Approach: 1. Keep dp[r] = number of subarrays ending here with product % k == r. 2. For each num, start a new subarray and extend previous remainders. 3. Accumulate counts into the answer.
 * Dry Run: nums = [1, 2, 3], k = 2. After 1: rem 1. After 2: 2 and 1*2 → rem 0 twice. After 3: 3 rem 1, plus previous*3. Count rem 0 and 1 accordingly.
 * Time Complexity: O(N * K)
 * Space Complexity: O(K)
 */
var resultArray = function (nums, k) {
  const answer = new Array(k).fill(0);
  let dp = new Array(k).fill(0);

  for (const num of nums) {
    const newDp = new Array(k).fill(0);
    const numMod = num % k;
    newDp[numMod] = 1;
    for (let i = 0; i < k; i++) {
      const newMod = (i * numMod) % k;
      newDp[newMod] += dp[i];
    }
    for (let i = 0; i < k; i++) {
      answer[i] += newDp[i];
    }
    dp = newDp;
  }

  return answer;
};
