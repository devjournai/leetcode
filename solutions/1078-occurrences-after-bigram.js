/**
 * Occurrences After Bigram
 * Intuition: The third word after a consecutive (first, second) pair is a local triple in the token list, so a single left-to-right scan of words suffices.
 * Approach: 1. Split text on spaces. 2. For each i < n-2, if words[i] and words[i+1] match first and second, push words[i+2]. 3. Return the collected thirds.
 * Dry Run: text="alice is a good girl she is a good student", first=a, second=good → girl, student.
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
