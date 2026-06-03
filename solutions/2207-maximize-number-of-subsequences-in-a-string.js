/**
 * Maximize Number Of Subsequences In A String
 * Intuition: The problem asks us to add either `pattern[0]` or `pattern[1]` exactly once to the `text` string to maximize the count of `pattern` as a subsequence. Adding `pattern[0]` anywhere can create new subsequences with all `pattern[1]` characters that appear after it. To maximize this, we should add `pattern[0]` at the very beginning of `text`, allowing it to pair with every `pattern[1]` in the original `text`. Similarly, adding `pattern[1]` anywhere can create new subsequences with all `pattern[0]` characters that appear before it. To maximize this, we should add `pattern[1]` at the very end of `text`, allowing it to pair with every `pattern[0]` in the original `text`. Thus, the maximum count will be the sum of the original number of `pattern` subsequences plus the maximum of (total count of `pattern[0]` in `text`) and (total count of `pattern[1]` in `text`).
 * Approach: 1. Initialize variables to count occurrences of `pattern[0]` and `pattern[1]` in `text`, and to track the total number of `pattern` subsequences formed by the original `text`. 2. Iterate through each character of `text`. 3. If the current character matches `pattern[1]`, add the current count of `pattern[0]` (representing `pattern[0]`s seen so far) to the total subsequence count. Increment the count of `pattern[1]` encountered. 4. If the current character matches `pattern[0]`, increment the count of `pattern[0]` encountered. 5. After the loop, the total subsequence count will represent the original subsequences. The individual character counts will represent the total occurrences of `pattern[0]` and `pattern[1]` in `text`. 6. Return the original subsequence count plus the maximum of the total `pattern[0]` count and total `pattern[1]` count.
 * Dry Run: text = "topcoder", pattern = "oc"
 *   firstPatternChar = 'o', secondPatternChar = 'c'
 *   countOfFirstPatternChar = 0
 *   countOfSecondPatternChar = 0
 *   currentSubsequenceTotal = 0
 *
 *   1. charIter = 't' (not 'o' or 'c')
 *   2. charIter = 'o' (firstPatternChar)
 *      countOfFirstPatternChar = 1
 *   3. charIter = 'p' (not 'o' or 'c')
 *   4. charIter = 'c' (secondPatternChar)
 *      currentSubsequenceTotal += countOfFirstPatternChar (1) -> currentSubsequenceTotal = 1
 *      countOfSecondPatternChar = 1
 *   5. charIter = 'o' (firstPatternChar)
 *      countOfFirstPatternChar = 2
 *   6. charIter = 'd' (not 'o' or 'c')
 *   7. charIter = 'e' (not 'o' or 'c')
 *   8. charIter = 'r' (not 'o' or 'c')
 *
 *   End of loop.
 *   currentSubsequenceTotal = 1 (original subsequences: ('o' at index 1, 'c' at index 3))
 *   countOfFirstPatternChar = 2 (total 'o's in "topcoder")
 *   countOfSecondPatternChar = 1 (total 'c's in "topcoder")
 *
 *   Result = currentSubsequenceTotal + Math.max(countOfFirstPatternChar, countOfSecondPatternChar)
 *          = 1 + Math.max(2, 1)
 *          = 1 + 2
 *          = 3
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumSubsequenceCount = function (textString, patternString) {
  const firstPatternChar = patternString[0];
  const secondPatternChar = patternString[1];
  let countOfFirstPatternChar = 0;
  let countOfSecondPatternChar = 0;
  let currentSubsequenceTotal = 0;

  for (const charIter of textString) {
    if (charIter === secondPatternChar) {
      currentSubsequenceTotal += countOfFirstPatternChar;
      countOfSecondPatternChar++;
    }
    if (charIter === firstPatternChar) {
      countOfFirstPatternChar++;
    }
  }

  return (
    currentSubsequenceTotal +
    Math.max(countOfFirstPatternChar, countOfSecondPatternChar)
  );
};
