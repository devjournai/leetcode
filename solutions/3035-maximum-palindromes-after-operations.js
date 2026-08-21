/**
 * Maximum Palindromes After Operations
 * Intuition: All characters from all words can be globally rearranged. To maximize palindromes, we should count total character pairs available across all words and then prioritize forming palindromes for shorter words first, as they consume fewer pairs.
 * Approach: 1. Aggregate character frequencies from all words into a single global frequency map. 2. Calculate the total number of character pairs available from these frequencies. 3. Collect the lengths of all words and sort them in ascending order. 4. Iterate through the sorted word lengths, attempting to form a palindrome for each word. If enough character pairs are available for a word of length L (requiring floor(L/2) pairs), consume the pairs and increment the palindrome count.
 * Dry Run: words = ["abbc", "dc"]
 *   1. Initialize globalCharFrequencies = [0,...0] (length 26), totalAvailablePairs = 0, palindromeCount = 0.
 *   2. Process "abbc": globalCharFrequencies becomes [1,2,1,0,...0] (a:1, b:2, c:1).
 *   3. Process "dc": globalCharFrequencies becomes [1,2,2,1,0,...0] (a:1, b:2, c:2, d:1).
 *   4. Calculate totalAvailablePairs:
 *      - For 'a' (1): floor(1/2) = 0. totalAvailablePairs = 0.
 *      - For 'b' (2): floor(2/2) = 1. totalAvailablePairs = 1.
 *      - For 'c' (2): floor(2/2) = 1. totalAvailablePairs = 2.
 *      - For 'd' (1): floor(1/2) = 0. totalAvailablePairs = 2.
 *   5. wordLengthsCollection = [4, 2]. Sorts to [2, 4].
 *   6. Iterate through wordLengthsCollection:
 *      - currentWordLength = 2: requiredPairs = floor(2/2) = 1. totalAvailablePairs (2) >= 1.
 *        totalAvailablePairs = 2 - 1 = 1. palindromeCount = 1.
 *      - currentWordLength = 4: requiredPairs = floor(4/2) = 2. totalAvailablePairs (1) < 2. Cannot form.
 *   7. Return palindromeCount = 1.
 * Time Complexity: O(S + N log N)
 * Space Complexity: O(N)
 */
var maxPalindromesAfterOperations = function (words) {
  const globalCharFrequencies = new Array(26).fill(0);
  let totalAvailablePairs = 0;
  let palindromeCount = 0;

  for (let initialIndex = 0; initialIndex < words.length; initialIndex++) {
    const currentWordString = words[initialIndex];
    for (
      let characterIndex = 0;
      characterIndex < currentWordString.length;
      characterIndex++
    ) {
      const characterSymbol = currentWordString[characterIndex];
      globalCharFrequencies[
        characterSymbol.charCodeAt(0) - "a".charCodeAt(0)
      ]++;
    }
  }

  for (
    let freqIndex = 0;
    freqIndex < globalCharFrequencies.length;
    freqIndex++
  ) {
    const frequencyValue = globalCharFrequencies[freqIndex];
    totalAvailablePairs += Math.floor(frequencyValue / 2);
  }

  const wordLengthsCollection = words.map(
    (currentString) => currentString.length
  );
  wordLengthsCollection.sort((lenA, lenB) => lenA - lenB);

  for (
    let lengthIter = 0;
    lengthIter < wordLengthsCollection.length;
    lengthIter++
  ) {
    const currentWordLength = wordLengthsCollection[lengthIter];
    const requiredPairs = Math.floor(currentWordLength / 2);
    if (totalAvailablePairs >= requiredPairs) {
      totalAvailablePairs -= requiredPairs;
      palindromeCount++;
    }
  }

  return palindromeCount;
};
