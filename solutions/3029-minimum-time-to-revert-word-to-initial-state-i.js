/**
 * Minimum Time To Revert Word To Initial State I
 * Intuition: At each second, `k` characters are removed from the front, and `k` are added to the end. This effectively shifts the original string content to the left by `k` positions. For the word to revert to its initial state, the remaining suffix of the original word (after `t*k` characters are removed) must match the initial prefix of the original word of the same length. Since we can add *any* `k` characters, we can always complete the match if the main prefix/suffix condition holds. If the entire original string is shifted out, we can always reconstruct it using new characters.
 * Approach: 1. Initialize a `timeCounter` starting from 1. 2. In a loop, calculate `charactersRemoved` as `timeCounter * k`. 3. If `charactersRemoved` is greater than or equal to the total `wordLength`, it means the original word has been fully shifted out. At this point, we can always choose to add characters that recreate the initial word, so `timeCounter` is the answer. 4. Otherwise, compare the suffix of the original `word` starting from `charactersRemoved` with the prefix of the original `word` of length `wordLength - charactersRemoved`. 5. If these two parts are identical, `timeCounter` is the minimum time. 6. If no match is found, increment `timeCounter` and repeat.
 * Dry Run: word = "abacaba", k = 3
 * wordLength = 7
 *
 * timeCounter = 1:
 *   charactersRemoved = 1 * 3 = 3
 *   3 >= 7 is false.
 *   remainingSuffix = word.slice(3) = "caba"
 *   requiredPrefix = word.slice(0, 7 - 3) = word.slice(0, 4) = "abac"
 *   "caba" === "abac" is false.
 *   timeCounter becomes 2.
 *
 * timeCounter = 2:
 *   charactersRemoved = 2 * 3 = 6
 *   6 >= 7 is false.
 *   remainingSuffix = word.slice(6) = "a"
 *   requiredPrefix = word.slice(0, 7 - 6) = word.slice(0, 1) = "a"
 *   "a" === "a" is true.
 *   Return 2.
 * Time Complexity: O(N^2/K)
 * Space Complexity: O(N)
 */
var minimumTimeToInitialState = function (word, k) {
  const wordLength = word.length;
  let timeCounter = 1;

  while (true) {
    const charactersRemoved = timeCounter * k;

    if (charactersRemoved >= wordLength) {
      return timeCounter;
    }

    const remainingSuffix = word.slice(charactersRemoved);
    const requiredPrefix = word.slice(0, wordLength - charactersRemoved);

    if (remainingSuffix === requiredPrefix) {
      return timeCounter;
    }

    timeCounter++;
  }
};
