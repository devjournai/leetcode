/**
 * Minimum Deletions for At Most K Distinct Characters
 * Intuition: If more than k distinct letters appear, delete the rarest letters first until k distinct remain.
 * Approach: 1. Count frequencies. 2. If distinct count ≤ k, return 0. 3. Sort frequencies and sum the smallest (distinct - k) of them.
 * Dry Run: s = "abc", k = 2. Frequencies [1,1,1], drop one letter → 1 deletion.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minDeletion = function (s, k) {
  const count = new Map();

  for (const character of s) {
    count.set(character, (count.get(character) || 0) + 1);
  }

  if (count.size <= k) {
    return 0;
  }

  const frequencies = [...count.values()].sort((a, b) => a - b);
  let deletions = 0;
  for (let i = 0; i < frequencies.length - k; i++) {
    deletions += frequencies[i];
  }
  return deletions;
};
