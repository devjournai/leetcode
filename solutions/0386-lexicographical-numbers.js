/**
 * Lexicographical Numbers
 * Intuition: Lex order is a preorder walk of the decimal trie: try appending a 0 digit (`*10`) when it stays ≤ n, otherwise increment, peeling off trailing 9s (and n itself) so the next prefix is valid.
 * Approach: 1. Start at 1. 2. n times: push the current value. 3. If `current*10 ≤ n`, go deeper (`*10`). 4. Else while current ends in 9 or equals n, integer-divide by 10, then increment.
 * Dry Run: n = 13. Sequence 1,10,11,12,13,2,3,… : after 1 go to 10; after 13 (`=== n`) divide to 1 then increment to 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var lexicalOrder = function (upperLimit) {
  const outputCollection = [];
  let currentSequenceElement = 1;

  for (let iterationCount = 0; iterationCount < upperLimit; iterationCount++) {
    outputCollection.push(currentSequenceElement);

    let nextDeterminedFlag = false;

    if (currentSequenceElement * 10 <= upperLimit) {
      currentSequenceElement *= 10;
      nextDeterminedFlag = true;
    }

    if (!nextDeterminedFlag) {
      while (
        currentSequenceElement % 10 === 9 ||
        currentSequenceElement === upperLimit
      ) {
        currentSequenceElement = Math.floor(currentSequenceElement / 10);
      }
      currentSequenceElement++;
    }
  }

  return outputCollection;
};
