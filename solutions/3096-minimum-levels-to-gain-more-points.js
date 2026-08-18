/**
 * Minimum Levels To Gain More Points
 * Intuition: Convert 0 to -1 so scores are prefix sums. Alice takes a prefix of at least 1 and not all levels; we need prefix > total-prefix, i.e. 2*prefix > total.
 * Approach: 1. Map 0->-1 and compute totalScore. 2. Accumulate Alice's prefix. 3. Return the first index+1 where 2*prefix > total and remaining levels exist, else -1.
 * Dry Run:
 *   possible = [1,0,1,0] mapped [1,-1,1,-1] total 0. After 1 level prefix 1 > 0. Return 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumLevels = function (possible) {
  const levelCount = possible.length;
  let totalScore = 0;
  for (const levelValue of possible) {
    totalScore += levelValue === 1 ? 1 : -1;
  }
  let aliceScore = 0;
  for (let levelIndex = 0; levelIndex < levelCount - 1; levelIndex++) {
    aliceScore += possible[levelIndex] === 1 ? 1 : -1;
    if (aliceScore * 2 > totalScore) {
      return levelIndex + 1;
    }
  }
  return -1;
};
