/**
 * Remove All Occurrences Of A Substring
 * Intuition: A stack of characters: after each push, if the suffix equals `part`, pop those characters (handles nested occurrences).
 * Approach: 1. Push each char of `s` onto `stringBuilder`. 2. If length ≥ part length and suffix join equals `part`, pop `subPartLength` times. 3. Join the stack.
 * Dry Run: s="daabcbaabcbc", part="abc". Repeated pops leave "dab".
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
