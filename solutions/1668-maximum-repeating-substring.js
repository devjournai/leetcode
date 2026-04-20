/**
 * Maximum Repeating Substring
 * Time Complexity: O(N^2/M)
 * Space Complexity: O(N)
 */
var maxRepeating = function (sequence, word) {
  let maximumRepetitions = 0;
  let currentAccumulatedWord = "";
  let lengthOfSequence = sequence.length;

  while (true) {
    let potentialNextWord = currentAccumulatedWord + word;

    if (potentialNextWord.length > lengthOfSequence) {
      break;
    }

    if (sequence.includes(potentialNextWord)) {
      maximumRepetitions++;
      currentAccumulatedWord = potentialNextWord;
    } else {
      break;
    }
  }

  return maximumRepetitions;
};
