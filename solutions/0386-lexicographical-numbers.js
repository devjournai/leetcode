/**
 * Lexicographical Numbers
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
      while (currentSequenceElement % 10 === 9 || currentSequenceElement === upperLimit) {
        currentSequenceElement = Math.floor(currentSequenceElement / 10);
      }
      currentSequenceElement++;
    }
  }

  return outputCollection;
};