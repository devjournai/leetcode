/**
 * Partition String
 * Intuition: Grow a candidate greedily and cut whenever the current piece has never been used, producing the longest sequence of unique segments from left to right.
 * Approach: 1. Keep a set of used pieces and a growing string t. 2. For each char, append to t; if t is new, emit it and reset t. 3. Return the list of pieces.
 * Dry Run: s = "abbccccd". Pieces "a", "b", "bc", "c", "cc", "d" (exact split depends on greedy first-seen cuts).
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var partitionString = function (s) {
  const used = new Set();
  const answer = [];
  let piece = "";
  for (const char of s) {
    piece += char;
    if (!used.has(piece)) {
      used.add(piece);
      answer.push(piece);
      piece = "";
    }
  }
  return answer;
};
