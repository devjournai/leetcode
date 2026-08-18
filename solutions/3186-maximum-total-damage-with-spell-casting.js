/**
 * Maximum Total Damage With Spell Casting
 * Intuition: If you cast damage d you cannot cast d-2, d-1, d+1, d+2. Group equal damages and house-robber on sorted unique values, skipping neighbors within 2.
 * Approach: 1. Count frequency of each damage. 2. Sort unique damages. 3. dp[i] = max(dp[i-1], damage[i]*count + dp[j]) where j is last index with damage[j] < damage[i]-2.
 * Dry Run:
 *   power = [1,1,3,4] take two 1s (2) or 3 or 4. Best 6? 1+1+4=6 since 4 and 1 differ by 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumTotalDamage = function (power) {
  const damageFrequency = new Map();
  for (const damageValue of power) {
    damageFrequency.set(
      damageValue,
      (damageFrequency.get(damageValue) || 0) + 1,
    );
  }
  const uniqueDamages = [...damageFrequency.keys()].sort((a, b) => a - b);
  const uniqueCount = uniqueDamages.length;
  const maxDamageEndingAt = new Array(uniqueCount).fill(0);
  for (let index = 0; index < uniqueCount; index++) {
    const takeCurrent =
      uniqueDamages[index] * damageFrequency.get(uniqueDamages[index]);
    let previousCompatibleIndex = index - 1;
    while (
      previousCompatibleIndex >= 0 &&
      uniqueDamages[previousCompatibleIndex] >= uniqueDamages[index] - 2
    ) {
      previousCompatibleIndex--;
    }
    const takeOption =
      takeCurrent +
      (previousCompatibleIndex >= 0
        ? maxDamageEndingAt[previousCompatibleIndex]
        : 0);
    const skipOption = index > 0 ? maxDamageEndingAt[index - 1] : 0;
    maxDamageEndingAt[index] = Math.max(takeOption, skipOption);
  }
  return maxDamageEndingAt[uniqueCount - 1];
};
