/**
 * Count Common Words With One Occurrence
 * Intuition: To find words appearing exactly once in both lists, we need to first determine the frequency of each word in both lists independently. Then, we can compare these frequencies to identify words that meet the single occurrence criterion in both.
 * Approach: 1. Create a frequency map for the first array (words1). 2. Create a separate frequency map for the second array (words2). 3. Iterate through the entries of the first frequency map. For each word that appeared exactly once in words1, check if it also appeared exactly once in the second frequency map. 4. Count how many words satisfy this condition.
 * Dry Run: words1 = ["a","b","c","a"], words2 = ["a","b","x","a"]
 *   1. frequencyMapOne: {"a": 2, "b": 1, "c": 1}
 *   2. frequencyMapTwo: {"a": 2, "b": 1, "x": 1}
 *   3. occurrencesCounter = 0
 *   4. Iterate frequencyMapOne:
 *      - For "a": countVal = 2. Not 1. Skip.
 *      - For "b": countVal = 1.
 *        - countInSecondMap = frequencyMapTwo.get("b") = 1.
 *        - Since countInSecondMap is 1, increment occurrencesCounter to 1.
 *      - For "c": countVal = 1.
 *        - countInSecondMap = frequencyMapTwo.get("c") = undefined.
 *        - Not 1. Skip.
 *   5. Return occurrencesCounter = 1.
 * Time Complexity: O(N + M)
 * Space Complexity: O(U1 + U2)
 */
var countWords = function (words1, words2) {
  const frequencyMapOne = new Map();
  for (const currentWord of words1) {
    frequencyMapOne.set(
      currentWord,
      (frequencyMapOne.get(currentWord) || 0) + 1,
    );
  }

  const frequencyMapTwo = new Map();
  for (const secondWord of words2) {
    frequencyMapTwo.set(secondWord, (frequencyMapTwo.get(secondWord) || 0) + 1);
  }

  let commonOccurrencesCount = 0;
  for (const [keyWord, countVal] of frequencyMapOne.entries()) {
    if (countVal === 1) {
      const countInSecondMap = frequencyMapTwo.get(keyWord);
      if (countInSecondMap === 1) {
        commonOccurrencesCount++;
      }
    }
  }

  return commonOccurrencesCount;
};
