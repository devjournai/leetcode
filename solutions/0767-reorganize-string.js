/**
 * Reorganize String
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reorganizeString = function (s) {
  const characterFrequencies = new Map();
  for (let traverseIndex = 0; traverseIndex < s.length; ++traverseIndex) {
    const individualChar = s[traverseIndex];
    characterFrequencies.set(
      individualChar,
      (characterFrequencies.get(individualChar) || 0) + 1,
    );
  }

  const orderedFrequencies = Array.from(characterFrequencies.entries()).sort(
    (firstEntry, secondEntry) => secondEntry[1] - firstEntry[1],
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
