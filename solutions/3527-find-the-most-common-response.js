/**
 * Find the Most Common Response
 * Intuition: Per day, count each unique response once, then take the globally most frequent string, breaking ties lexicographically.
 * Approach: 1. For each day's list, add set(responses) into a frequency map. 2. Find max frequency. 3. Return the lexicographically smallest string with that frequency.
 * Dry Run: [["good","ok"],["good","good"]]. After unique: good+ok then good. good has 2, ok has 1 → "good".
 * Time Complexity: O(total responses)
 * Space Complexity: O(total responses)
 */
var findCommonResponse = function (responses) {
  const count = new Map();

  for (const day of responses) {
    for (const response of new Set(day)) {
      count.set(response, (count.get(response) || 0) + 1);
    }
  }

  let maxFreq = 0;
  for (const freq of count.values()) {
    maxFreq = Math.max(maxFreq, freq);
  }

  let answer = "";
  for (const [response, freq] of count) {
    if (freq === maxFreq && (answer === "" || response < answer)) {
      answer = response;
    }
  }
  return answer;
};
