/**
 * Find the Original Typed String II
 * Intuition: Consecutive equal letters form groups. Each group of length g can be shortened to any length in [1, g]. Total strings of any length is the product of group sizes. We need length at least k, so subtract the DP-counted ways whose length is < k.
 * Approach: 1. Compress word into group lengths. 2. total = product(groups) mod 1e9+7. 3. If k <= number of groups, every choice already has length >= k. 4. Else DP: dp[j] = ways to make length j with groups processed so far, using a sliding window of size group. 5. Answer = total - sum(dp[0..k-1]).
 * Dry Run: word = "aabbccdd", k = 7. Groups [2,2,2,2], total = 16. Min length 4 < 7, DP counts strings shorter than 7; remainder is the answer.
 * Time Complexity: O(N + K^2)
 * Space Complexity: O(K)
 */

var possibleStringCount = function (word, k) {
  const MOD = 1000000007;
  const groups = getConsecutiveLetters(word);
  let totalCombinations = 1;
  for (const group of groups) {
    totalCombinations = (totalCombinations * group) % MOD;
  }
  if (k <= groups.length) {
    return totalCombinations;
  }

  let dp = Array(k).fill(0);
  dp[0] = 1;

  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    const nextDp = Array(k).fill(0);
    let windowSum = 0;
    const group = groups[groupIndex];
    for (let length = groupIndex; length < k; length++) {
      nextDp[length] = (nextDp[length] + windowSum) % MOD;
      windowSum = (windowSum + dp[length]) % MOD;
      if (length >= group) {
        windowSum = (windowSum - dp[length - group] + MOD) % MOD;
      }
    }
    dp = nextDp;
  }

  let invalidCombinations = 0;
  for (const count of dp) {
    invalidCombinations = (invalidCombinations + count) % MOD;
  }

  return (totalCombinations - invalidCombinations + MOD) % MOD;
};

function getConsecutiveLetters(word) {
  const groups = [];
  let group = 1;
  for (let index = 1; index < word.length; index++) {
    if (word[index] === word[index - 1]) {
      group++;
    } else {
      groups.push(group);
      group = 1;
    }
  }
  groups.push(group);
  return groups;
}
