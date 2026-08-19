/**
 * Construct String with Minimum Cost
 * Intuition: Build target from left to right. At each index, try every word that starts with the current character and take the cheapest way to cover a matching prefix.
 * Approach: 1. Group words by first character, keeping the minimum cost per identical word. 2. dp[i] is the min cost to build target[0..i). 3. From i, if a word matches target[i..] update dp[i + word.length]. Return dp[n] or -1.
 * Dry Run:
 *   target = "abcdef", words = ["abdef","abc","d","def","ef"], costs = [100,1,1,10,5]
 *   dp[0]=0, use "abc" -> dp[3]=1, "d" -> dp[4]=2, "ef" -> dp[6]=7. Answer 7.
 * Time Complexity: O(n^2)
 * Space Complexity: O(sum of word lengths)
 */
var minimumCost = function (target, words, costs) {
  const INFINITY_COST = 1e9;
  const targetLength = target.length;
  const minCostToBuildPrefix = Array(targetLength + 1).fill(INFINITY_COST);
  minCostToBuildPrefix[0] = 0;

  const minCostByStartingLetter = Array.from({ length: 26 }, () => new Map());
  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    const word = words[wordIndex];
    const startingLetterIndex = word.charCodeAt(0) - 97;
    const previousCost =
      minCostByStartingLetter[startingLetterIndex].get(word) ?? INFINITY_COST;
    minCostByStartingLetter[startingLetterIndex].set(
      word,
      Math.min(previousCost, costs[wordIndex]),
    );
  }

  for (let startIndex = 0; startIndex < targetLength; startIndex++) {
    if (minCostToBuildPrefix[startIndex] === INFINITY_COST) {
      continue;
    }
    const startingLetterIndex = target.charCodeAt(startIndex) - 97;
    for (const [word, wordCost] of minCostByStartingLetter[
      startingLetterIndex
    ]) {
      const endIndex = startIndex + word.length;
      if (
        endIndex <= targetLength &&
        wordCost + minCostToBuildPrefix[startIndex] <
          minCostToBuildPrefix[endIndex] &&
        target.slice(startIndex, endIndex) === word
      ) {
        minCostToBuildPrefix[endIndex] =
          wordCost + minCostToBuildPrefix[startIndex];
      }
    }
  }

  return minCostToBuildPrefix[targetLength] === INFINITY_COST
    ? -1
    : minCostToBuildPrefix[targetLength];
};
