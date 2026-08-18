/**
* Count Substrings Starting And Ending With Given Character
* Intuition: Each occurrence of the target character `c` can serve as the ending point for itself and all preceding occurrences of `c`. If there are `k` instances of `c` in the string, the number of ways to pick two (or one) positions such that the first position is less than or equal to the second position is equivalent to the sum of integers from 1 to `k`.
* Approach: 1. Initialize a variable `totalOccurrences` to count how many times the character `c` appears in the input string `s`. 2. Iterate through the string `s` using an index-based `for` loop. 3. For each character encountered, if it matches `c`, increment `totalOccurrences`. 4. After iterating through the entire string, calculate the result using the formula for the sum of the first `n` natural numbers, which is `n * (n + 1) / 2`, where `n` is `totalOccurrences`. This formula directly computes all possible substrings formed by `totalOccurrences` instances of `c`. 5. Return the computed final count.
* Dry Run: s = "banana", c = 'a'
    1. `totalOccurrences` = 0
    2. `stringBound` = 6
    3. Loop `letterIndex` from 0 to 5:
    - `letterIndex = 0`: `currentChar` = 'b'. 'b' !== 'a'.
    - `letterIndex = 1`: `currentChar` = 'a'. 'a' === 'a'. `totalOccurrences` becomes 1.
    - `letterIndex = 2`: `currentChar` = 'n'. 'n' !== 'a'.
    - `letterIndex = 3`: `currentChar` = 'a'. 'a' === 'a'. `totalOccurrences` becomes 2.
    - `letterIndex = 4`: `currentChar` = 'n'. 'n' !== 'a'.
    - `letterIndex = 5`: `currentChar` = 'a'. 'a' === 'a'. `totalOccurrences` becomes 3.
    4. Loop finishes. `totalOccurrences` = 3.
    5. `resultantCount` = (3 * (3 + 1)) / 2 = (3 * 4) / 2 = 12 / 2 = 6.
    6. Return 6. (Substrings: "a" at index 1, "a" at index 3, "a" at index 5, "ana" from 1 to 3, "ana" from 3 to 5, "anana" from 1 to 5)
* Time Complexity: O(N)
* Space Complexity: O(1)
*/
var countSubstrings = function (s, c) {
  let totalOccurrences = 0;
  const stringBound = s.length;

  for (let letterIndex = 0; letterIndex < stringBound; letterIndex++) {
    const currentChar = s[letterIndex];
    if (currentChar === c) {
      totalOccurrences++;
    }
  }

  const resultantCount = (totalOccurrences * (totalOccurrences + 1)) / 2;
  return resultantCount;
};
