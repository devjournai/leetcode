/**
 * Maximum Score with Co-Prime Element
 * Intuition: Pick index i with final value v coprime to all other final values. Change others that share a factor with v. Score v - (n-1 - count already coprime to v, plus maybe change v itself).
 * Approach: Try each possible selectedValue <= maxVal. Count how many nums[j] are already coprime to it (those can stay). Need all others changed. If some nums[i]==v can select without changing i. Score = v - (n - coprimeCount) or +1 if we needed to plant v.
 * Dry Run: Input: nums = [3,4,6], maxVal = 5. Output: 4.
 * Time Complexity: O(M log M + N * tau)
 * Space Complexity: O(M)
 */
var maximumScore = function (nums, maxVal) {
  const gcd = (a, b) => {
    while (b) [a, b] = [b, a % b];
    return a;
  };
  let ans = -1e18;
  for (let v = 1; v <= maxVal; v++) {
    let cop = 0,
      has = false;
    for (const x of nums) {
      if (gcd(x, v) === 1) cop++;
      if (x === v) has = true;
    }
    const cost = nums.length - cop + (has ? 0 : 1);
    const othersNeed = nums.length - (has ? cop : cop);
    const modificationCost = has ? nums.length - cop : nums.length - cop + 1;
    ans = Math.max(ans, v - modificationCost);
  }
  return ans;
};
