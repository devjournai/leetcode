/**
 * Process String with Special Operations I
 * Intuition: The problem involves building a string with operations like appending, removing last character, duplicating, and reversing. Since JavaScript strings are immutable and operations like deletion or insertion in the middle are inefficient, using an array of characters (`resultArr`) provides a mutable structure that allows efficient operations. Appending and removing from the end are O(1) amortized, while duplicating and reversing take O(current_length).
 * Approach: 1. Initialize an empty array, `resultArr`, to store the characters of the processed string. 2. Iterate through each character `char` in the input string `s` from left to right. 3. If `char` is a lowercase English letter, append it to `resultArr`. 4. If `char` is `'*'`, and `resultArr` is not empty, remove the last character from `resultArr` using `pop()`. 5. If `char` is `'#'`, duplicate the current `resultArr` by concatenating it with itself (`resultArr = resultArr.concat(resultArr)`). 6. If `char` is `'%'`, reverse `resultArr` in place using `reverse()`. 7. After processing all characters in `s`, join the characters in `resultArr` to form the final string and return it.
 * Dry Run: s = "a#b%*"
 *   - resultArr = []
 *   - char = 'a': resultArr.push('a') -> resultArr = ['a']
 *   - char = '#': resultArr = resultArr.concat(resultArr) -> resultArr = ['a', 'a']
 *   - char = 'b': resultArr.push('b') -> resultArr = ['a', 'a', 'b']
 *   - char = '%': resultArr.reverse() -> resultArr = ['b', 'a', 'a']
 *   - char = '*': resultArr.pop() -> resultArr = ['b', 'a']
 *   - End of loop. Return resultArr.join('') -> "ba"
 * Time Complexity: O(2^N)
 * Space Complexity: O(2^N)
 */
var processStr = function (s) {
  let resultArr = [];

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (char >= "a" && char <= "z") {
      resultArr.push(char);
    } else if (char === "*") {
      if (resultArr.length > 0) {
        resultArr.pop();
      }
    } else if (char === "#") {
      resultArr = resultArr.concat(resultArr);
    } else if (char === "%") {
      resultArr.reverse();
    }
  }

  return resultArr.join("");
};
