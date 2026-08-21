/**
 * Find the Maximum Factor Score of Array
 * Intuition: Factor score is gcd(all) * lcm(all). Removing at most one element means we compare the full array against every n-1 suffix/prefix split.
 * Approach: 1. Build prefix and suffix GCD/LCM arrays. 2. Start with the full-array score. 3. For each index i, combine prefix[i-1] with suffix[i+1] (using gcd 0 / lcm 1 for missing sides).
 * Dry Run: nums = [2, 4, 8, 16]. Full gcd=2, lcm=16, score=32. Removing 2 leaves gcd=4, lcm=16, score=64.
 * Time Complexity: O(N log A)
 * Space Complexity: O(N)
 */

var maxScore = function (nums) {
  const n = nums.length;
  const [prefixGcd, prefixLcm] = getPrefix(nums);
  const [suffixGcd, suffixLcm] = getSuffix(nums);
  let answer = suffixGcd[0] * suffixLcm[0];

  for (let index = 0; index < n; index++) {
    const gcdLeft = index > 0 ? prefixGcd[index - 1] : 0;
    const gcdRight = index + 1 < n ? suffixGcd[index + 1] : 0;
    const lcmLeft = index > 0 ? prefixLcm[index - 1] : 1;
    const lcmRight = index + 1 < n ? suffixLcm[index + 1] : 1;
    const score = gcd(gcdLeft, gcdRight) * lcm(lcmLeft, lcmRight);
    answer = Math.max(answer, score);
  }

  return answer;
};

function getPrefix(nums) {
  const prefixGcd = [];
  const prefixLcm = [];
  let currentGcd = 0;
  let currentLcm = 1;
  for (const num of nums) {
    currentGcd = gcd(currentGcd, num);
    currentLcm = lcm(currentLcm, num);
    prefixGcd.push(currentGcd);
    prefixLcm.push(currentLcm);
  }
  return [prefixGcd, prefixLcm];
}

function getSuffix(nums) {
  const suffixGcd = Array(nums.length);
  const suffixLcm = Array(nums.length);
  let currentGcd = 0;
  let currentLcm = 1;
  for (let index = nums.length - 1; index >= 0; index--) {
    currentGcd = gcd(currentGcd, nums[index]);
    currentLcm = lcm(currentLcm, nums[index]);
    suffixGcd[index] = currentGcd;
    suffixLcm[index] = currentLcm;
  }
  return [suffixGcd, suffixLcm];
}

function gcd(a, b) {
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}
