/**
 * Largest Substring Between Two Equal Characters
 * Intuition: For each character, the longest inner substring is lastIndex - firstIndex - 1. Only the first occurrence needs storing.
 * Approach: 1. Map each char to its first index. 2. On a repeat, update max with i - first - 1. 3. Return the max, or -1 if no repeats.
 * Dry Run: s = "abca".
 *   - Second 'a' at 3, first at 0 → length 2 ("bc").
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxLengthBetweenEqualCharacters = function (s) {
  const charFirstAppearance = new Map();
  let maximumLengthFound = -1;

  for (let currentPosition = 0; currentPosition < s.length; currentPosition++) {
    const currentCharElement = s[currentPosition];
    if (charFirstAppearance.has(currentCharElement)) {
      const firstOccurIndex = charFirstAppearance.get(currentCharElement);
      const calculatedDifference = currentPosition - firstOccurIndex - 1;
      maximumLengthFound = Math.max(maximumLengthFound, calculatedDifference);
    } else {
      charFirstAppearance.set(currentCharElement, currentPosition);
    }
  }

  return maximumLengthFound;
};
