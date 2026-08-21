/**
 * Maximum Value of an Alternating Sequence
 * Intuition: If n = 1, the sequence contains only the starting value s, so the answer is s.
 * Approach: If n = 1, the sequence contains only the starting value s, so the answer is s. Otherwise, the sequence length is at least 2. Since the absolute difference between adjacent elements is at most m, and the sequence must strictly alternate up and down, to maximize some element we should repeatedly "rise by m, then fall by 1": the fall step is taken as the minimum value 1 so that the next rise has the largest possible room. Construct the sequence in a "rise first" pattern:
 * Dry Run: Input: n = 4, s = 3, m = 5. Output: 12.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var maximumValue = function (n, s, m) {
  if (n === 1) {
    return s;
  }
  return s + Math.floor(n / 2) * (m - 1) + 1;
};
