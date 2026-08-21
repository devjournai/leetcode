/**
 * Majority Frequency Characters
 * Intuition: Group letters by frequency. The majority group is the one with the most distinct letters; ties go to the higher frequency.
 * Approach: 1. Count character frequencies. 2. Bucket characters by frequency. 3. Pick the bucket with max size, then max frequency.
 * Dry Run: If two groups have the same size, the higher frequency group's characters are returned concatenated.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var majorityFrequencyGroup = function (s) {
  const frequencyByChar = new Map();
  for (const char of s) {
    frequencyByChar.set(char, (frequencyByChar.get(char) || 0) + 1);
  }

  const charsByFrequency = new Map();
  for (const [char, frequency] of frequencyByChar) {
    if (!charsByFrequency.has(frequency)) {
      charsByFrequency.set(frequency, []);
    }
    charsByFrequency.get(frequency).push(char);
  }

  let bestSize = 0;
  let bestFrequency = 0;
  let bestChars = [];
  for (const [frequency, chars] of charsByFrequency) {
    if (
      chars.length > bestSize ||
      (chars.length === bestSize && frequency > bestFrequency)
    ) {
      bestSize = chars.length;
      bestFrequency = frequency;
      bestChars = chars;
    }
  }
  return bestChars.join("");
};
