/**
 * Number of Student Replacements
 * Intuition: A replacement happens whenever a strictly better (smaller) rank appears; that student becomes the new best.
 * Approach: 1. Track the current best rank, initially ranks[0]. 2. Scan left to right; each time ranks[i] < best, increment and update best.
 * Dry Run: ranks = [4,3,5,2] → 3 replaces 4, 2 replaces 3, answer 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var totalReplacements = function (ranks) {
  let replacements = 0;
  let bestRank = ranks[0];

  for (const rank of ranks) {
    if (rank < bestRank) {
      bestRank = rank;
      replacements++;
    }
  }

  return replacements;
};
