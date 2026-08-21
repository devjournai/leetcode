/**
 * Filter Characters By Frequency
 * Intuition: Keep a character only when its global count is strictly less than k, and preserve original order.
 * Approach: 1. Count occurrences of each letter. 2. Walk s again and append characters whose count is < k. 3. Join the kept characters.
 * Dry Run: s = "aadbbcccca", k = 3. Counts: a=3, d=1, b=2, c=4. Keep d then bb → "dbb".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var filterCharacters = function (s, k) {
  const frequency = new Array(26).fill(0);
  for (const character of s) {
    frequency[character.charCodeAt(0) - 97]++;
  }

  const kept = [];
  for (const character of s) {
    if (frequency[character.charCodeAt(0) - 97] < k) {
      kept.push(character);
    }
  }

  return kept.join("");
};
