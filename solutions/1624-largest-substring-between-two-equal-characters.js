/**
 * Largest Substring Between Two Equal Characters
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
