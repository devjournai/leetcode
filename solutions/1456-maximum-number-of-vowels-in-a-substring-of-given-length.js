/**
 * Maximum Number Of Vowels In A Substring Of Given Length
 * Intuition: Fixed-length window: count vowels in the first k chars, then slide, adding the incoming char and dropping the outgoing one.
 * Approach: 1. Put a,e,i,o,u in a Set. 2. Count vowels in s[0..k). 3. For each later index, ++ if incoming is a vowel, -- if outgoing is. 4. Track the maximum count.
 * Dry Run: s = "abciiidef", k = 3
 *   - "abc" vowels=1
 *   - slide to "bci"=1, "cii"=2, "iii"=3, ...
 *   - max = 3
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxVowels = function (sourceString, subsequenceLength) {
  const englishVowels = new Set(["a", "e", "i", "o", "u"]);
  let currentWindowVowelCount = 0;
  let overallMaxVowels = 0;

  for (
    let initialWindowPointer = 0;
    initialWindowPointer < subsequenceLength;
    initialWindowPointer++
  ) {
    if (englishVowels.has(sourceString[initialWindowPointer])) {
      currentWindowVowelCount++;
    }
  }

  overallMaxVowels = currentWindowVowelCount;

  for (
    let slideAdvancePointer = subsequenceLength;
    slideAdvancePointer < sourceString.length;
    slideAdvancePointer++
  ) {
    const incomingCharacter = sourceString[slideAdvancePointer];
    const outgoingCharacter =
      sourceString[slideAdvancePointer - subsequenceLength];

    if (englishVowels.has(incomingCharacter)) {
      currentWindowVowelCount++;
    }
    if (englishVowels.has(outgoingCharacter)) {
      currentWindowVowelCount--;
    }

    overallMaxVowels = Math.max(overallMaxVowels, currentWindowVowelCount);
  }

  return overallMaxVowels;
};
