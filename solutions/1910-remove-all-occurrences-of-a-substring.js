/**
 * Remove All Occurrences Of A Substring
 * Time Complexity: O(N * M)
 * Space Complexity: O(N)
 */
var removeOccurrences = function (s, part) {
  const stringBuilder = [];
  const totalStringLength = s.length;
  const subPartLength = part.length;

  for (let charIndex = 0; charIndex < totalStringLength; charIndex++) {
    stringBuilder.push(s[charIndex]);

    if (stringBuilder.length >= subPartLength) {
      const currentSuffix = stringBuilder
        .slice(stringBuilder.length - subPartLength)
        .join("");

      if (currentSuffix === part) {
        for (
          let removalIteration = 0;
          removalIteration < subPartLength;
          removalIteration++
        ) {
          stringBuilder.pop();
        }
      }
    }
  }

  return stringBuilder.join("");
};
