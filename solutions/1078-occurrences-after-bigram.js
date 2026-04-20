/**
 * Occurrences After Bigram
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findOcurrences = function (text, firstPhrase, secondPhrase) {
  const allWords = text.split(" ");
  const collectedResults = [];

  let currentIterator = 0;
  const loopLimit = allWords.length - 2;

  while (currentIterator < loopLimit) {
    const wordOne = allWords[currentIterator];
    const wordTwo = allWords[currentIterator + 1];

    if (wordOne === firstPhrase && wordTwo === secondPhrase) {
      const thirdWordCandidate = allWords[currentIterator + 2];
      collectedResults.push(thirdWordCandidate);
    }
    currentIterator++;
  }

  return collectedResults;
};
