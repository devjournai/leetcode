/**
 * Reorganize String
 * Intuition: If any character’s count exceeds `ceil(n/2)`, two copies must sit adjacent. Otherwise place letters most-frequent first into even indices, then odd indices, so identical letters are spaced.
 * Approach: 1. Count into `characterFrequencies` and sort entries by count descending. 2. If `highestFrequency > Math.ceil(s.length / 2)`, return `""`. 3. Walk counts: write `charToPlace` at `insertPosition`, then `insertPosition += 2`; when past the end, reset to 1. 4. Join `outputCharacters`.
 * Dry Run: s = "aab".
 *   - Counts a:2, b:1; max 2 ≤ ceil(1.5)=2. Place a at 0, a at 2, b at 1 → "aba".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reorganizeString = function (s) {
  const characterFrequencies = new Map();
  for (let traverseIndex = 0; traverseIndex < s.length; ++traverseIndex) {
    const individualChar = s[traverseIndex];
    characterFrequencies.set(
      individualChar,
      (characterFrequencies.get(individualChar) || 0) + 1
    );
  }

  const orderedFrequencies = Array.from(characterFrequencies.entries()).sort(
    (firstEntry, secondEntry) => secondEntry[1] - firstEntry[1]
  );

  const highestFrequency = orderedFrequencies[0][1];
  const lengthMidpointCeil = Math.ceil(s.length / 2);

  if (highestFrequency > lengthMidpointCeil) {
    return "";
  }

  const outputCharacters = new Array(s.length);
  let insertPosition = 0;

  for (const currentFrequencyTuple of orderedFrequencies) {
    const charToPlace = currentFrequencyTuple[0];
    const numOccurrences = currentFrequencyTuple[1];

    for (
      let occurrenceIterator = 0;
      occurrenceIterator < numOccurrences;
      ++occurrenceIterator
    ) {
      outputCharacters[insertPosition] = charToPlace;
      insertPosition += 2;
      if (insertPosition >= s.length) {
        insertPosition = 1;
      }
    }
  }

  return outputCharacters.join("");
};
