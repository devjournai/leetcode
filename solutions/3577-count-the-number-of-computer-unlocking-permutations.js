/**
 * Count the Number of Computer Unlocking Permutations
 * Intuition: Computer 0 starts unlocked. A permutation of the others works iff we never try to unlock a computer that is not strictly harder than 0, and any order of the rest is fine — so if every complexity[i] > complexity[0], the count is (n-1)!.
 * Approach: 1. If any later complexity is ≤ complexity[0], return 0. 2. Otherwise multiply 1 * 2 * ... * (n-1) modulo 1e9+7.
 * Dry Run: complexity = [1, 2, 3]. All later > 1, (3-1)! = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countPermutations = function (complexity) {
  const MOD = 1e9 + 7;
  let answer = 1;
  for (let i = 1; i < complexity.length; i++) {
    if (complexity[i] <= complexity[0]) {
      return 0;
    }
    answer = (answer * i) % MOD;
  }
  return answer;
};
