/**
 * Minimum Time to Revert Word to Initial State II
 * Intuition: After t seconds the first t*k characters are gone. The word can match the original if the remaining suffix is already a prefix of `word`. The Z-array answers that in O(1) per candidate t: z[t*k] is how far the suffix starting at t*k matches the prefix.
 * Approach: 1. Build the Z-array of `word`, where z[i] is the longest prefix of word[i..] that is also a prefix of word. 2. The maximum operations needed is ceil(n / k) = (n - 1) / k + 1, which always works by replacing the whole string. 3. For each smaller t from 1, check whether z[t * k] >= n - t * k. 4. Return the smallest such t.
 * Dry Run: word = "abacaba", k = 3, n = 7. maxOps = 3. z[3] for "caba" vs "abacaba" is 0, so t = 1 fails. z[6] = 1 >= 7 - 6, so t = 2 works.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minimumTimeToInitialState = function (word, k) {
  const wordLength = word.length;
  const maximumOperations = Math.floor((wordLength - 1) / k) + 1;
  const zValues = buildZArray(word);

  for (
    let operationCount = 1;
    operationCount < maximumOperations;
    operationCount++
  ) {
    const removedCharacterCount = operationCount * k;
    if (zValues[removedCharacterCount] >= wordLength - removedCharacterCount) {
      return operationCount;
    }
  }

  return maximumOperations;
};

function buildZArray(text) {
  const textLength = text.length;
  const zValues = new Array(textLength).fill(0);
  let windowLeft = 0;
  let windowRight = 0;

  for (let index = 1; index < textLength; index++) {
    if (index < windowRight) {
      zValues[index] = Math.min(
        windowRight - index,
        zValues[index - windowLeft],
      );
    }
    while (
      index + zValues[index] < textLength &&
      text[zValues[index]] === text[index + zValues[index]]
    ) {
      zValues[index]++;
    }
    if (index + zValues[index] > windowRight) {
      windowLeft = index;
      windowRight = index + zValues[index];
    }
  }

  return zValues;
}
