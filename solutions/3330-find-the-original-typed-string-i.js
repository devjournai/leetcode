/**
 * Find the Original Typed String I
 * Intuition: Alice intended some string and may have held one key too long. Every extra consecutive equal pair is a possible place she over-typed, plus the original string itself.
 * Approach: Start at 1. For each index i >= 1, if word[i] == word[i-1], increment the answer.
 * Dry Run: word = "abbcccc". Equal pairs at indices (1,2), (3,4), (4,5), (5,6) -> 1 + 4 = 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var possibleStringCount = function (word) {
  let answer = 1;

  for (let index = 1; index < word.length; index++) {
    if (word[index] === word[index - 1]) {
      answer++;
    }
  }

  return answer;
};
