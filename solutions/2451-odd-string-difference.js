/**
 * Odd String Difference
 * Intuition: Convert each word into its unique difference array signature. Store frequencies of these signatures in a map. The signature with a frequency of one identifies the unique string.
 * Approach: 1. Create a helper function to convert a word into its difference array, then join it into a string for use as a map key. 2. Iterate through the input `words` array, compute the difference signature for each word, and update its count in a frequency map. 3. Iterate through the frequency map to find the difference signature that has a count of one. 4. Iterate through the `words` array again, compute the difference signature for each word, and return the first word whose signature matches the unique one found in step 3.
 * Dry Run: words = ["abc", "bcd", "ace"]
 * 1. calculateDifference("abc") -> "1,1" (b-a=1, c-b=1)
 * 2. calculateDifference("bcd") -> "1,1" (c-b=1, d-c=1)
 * 3. calculateDifference("ace") -> "2,2" (c-a=2, e-c=2)
 *
 * Map after first pass: {"1,1": 2, "2,2": 1}
 * Second pass (find unique): "2,2" has frequency 1. soleDifferenceKey = "2,2".
 * Third pass (find word):
 * - "abc" difference is "1,1" != "2,2"
 * - "bcd" difference is "1,1" != "2,2"
 * - "ace" difference is "2,2" == "2,2" -> Return "ace".
 * Time Complexity: O(W * N)
 * Space Complexity: O(W * N)
 */
var oddString = function (wordsArray) {
  function calculateDifference(currentStringParameter) {
    const currentStringLength = currentStringParameter.length;
    const differenceCollector = [];
    for (
      let characterIndex = 0;
      characterIndex < currentStringLength - 1;
      characterIndex++
    ) {
      const firstCharAscii = currentStringParameter.charCodeAt(characterIndex);
      const secondCharAscii = currentStringParameter.charCodeAt(
        characterIndex + 1
      );
      const calculatedDifference = secondCharAscii - firstCharAscii;
      differenceCollector.push(calculatedDifference);
    }
    return differenceCollector.join(",");
  }

  const differenceFrequencies = new Map();

  for (const currentWordEntry of wordsArray) {
    const obtainedDifference = calculateDifference(currentWordEntry);
    const currentFrequency = differenceFrequencies.get(obtainedDifference) || 0;
    differenceFrequencies.set(obtainedDifference, currentFrequency + 1);
  }

  let soleDifferenceKey;
  for (const [differenceKey, frequencyCount] of differenceFrequencies) {
    if (frequencyCount === 1) {
      soleDifferenceKey = differenceKey;
      break;
    }
  }

  for (const candidateWord of wordsArray) {
    const candidateDifference = calculateDifference(candidateWord);
    if (candidateDifference === soleDifferenceKey) {
      return candidateWord;
    }
  }
};
