/**
 * Find Mirror Score of a String
 * Intuition: A letter's mirror is the alphabet reverse (a↔z, b↔y, ...). Score a pair as distance of indices. Greedy: if a waiting mirror exists, match the closest unused one (stack).
 * Approach: 1. 26 stacks of unmatched indices. 2. For each i, if the mirror stack is nonempty, pop and add i - popped. 3. Otherwise push i onto this letter's stack.
 * Dry Run: s = "aczzx". 'z' at 2 pairs with 'a' at 0 (score 2); 'x' at 4 pairs with 'c' at 1 (score 3). Total 5.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var calculateScore = function (s) {
  let score = 0;
  const unmatchedIndices = Array.from({ length: 26 }, () => []);

  for (let index = 0; index < s.length; index++) {
    const letterIndex = s.charCodeAt(index) - 97;
    const mirrorIndex = 25 - letterIndex;
    if (unmatchedIndices[mirrorIndex].length > 0) {
      score += index - unmatchedIndices[mirrorIndex].pop();
    } else {
      unmatchedIndices[letterIndex].push(index);
    }
  }

  return score;
};
