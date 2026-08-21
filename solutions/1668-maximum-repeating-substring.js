/**
 * Maximum Repeating Substring
 * Intuition: The answer is the largest k such that word repeated k times is a substring of sequence. Grow the repeated string until it no longer occurs or exceeds sequence length.
 * Approach: 1. Start with empty acc. 2. While acc+word fits in sequence and sequence.includes(acc+word), increment k and extend acc. 3. Return k.
 * Dry Run: sequence="ababc", word="ab" → "ab" yes, "abab" yes, "ababab" too long/missing → 2.
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
