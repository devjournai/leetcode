/**
 * Smallest Palindromic Rearrangement I
 * Intuition: To construct the lexicographically smallest palindrome, we want to place the smallest available characters at the outermost positions. This strategy involves building the first half of the palindrome with characters in ascending order and then mirroring it to form the second half. Any character with an odd frequency will occupy the middle position.
 * Approach:
 * 1. Count the frequency of each lowercase English letter present in the input string `s`. An array of size 26 can efficiently store these counts.
 * 2. Initialize an empty array `firstHalfChars` to collect characters for the first half of the resulting palindrome, and an empty string `middleChar` to store the character that will be in the exact middle of the palindrome (if the string length is odd).
 * 3. Iterate through characters from 'a' to 'z':
 *    a. For each character `c`, determine its frequency `count` from the pre-computed counts.
 *    b. Append `c` to `firstHalfChars` `Math.floor(count / 2)` times. This ensures we use pairs of characters for the outer halves, starting with the smallest characters.
 *    c. If `count % 2 === 1`, it means this character appears an odd number of times. This character must be the `middleChar`. Since `s` is guaranteed to be palindromic, there will be at most one such character.
 * 4. Convert `firstHalfChars` array into a string `firstHalfString` by joining its elements.
 * 5. Create `secondHalfString` by reversing `firstHalfString`.
 * 6. Concatenate `firstHalfString`, `middleChar`, and `secondHalfString` to form the final lexicographically smallest palindromic permutation.
 * Dry Run: s = "babab"
 * 1. Counts: `a: 2`, `b: 3`
 * 2. `firstHalfChars = []`, `middleChar = ''`
 * 3. Iterate through characters:
 *    - For 'a' (index 0): `count = 2`. Add 'a' `Math.floor(2/2) = 1` time to `firstHalfChars`. `firstHalfChars = ['a']`.
 *    - For 'b' (index 1): `count = 3`. Add 'b' `Math.floor(3/2) = 1` time to `firstHalfChars`. `firstHalfChars = ['a', 'b']`. Since `count % 2 === 1`, set `middleChar = 'b'`.
 *    - For 'c' through 'z': `count = 0`. No changes.
 * 4. `firstHalfString = firstHalfChars.join('')` => "ab"
 * 5. `secondHalfString = firstHalfString.split('').reverse().join('')` => "ba"
 * 6. Result: `firstHalfString + middleChar + secondHalfString` => "ab" + "b" + "ba" => "abbba"
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var smallestPalindrome = function (s) {
  const charCounts = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    charCounts[s.charCodeAt(i) - 97]++;
  }

  const firstHalfChars = [];
  let middleChar = "";

  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(97 + i);
    const count = charCounts[i];

    for (let j = 0; j < Math.floor(count / 2); j++) {
      firstHalfChars.push(char);
    }

    if (count % 2 === 1) {
      middleChar = char;
    }
  }

  const firstHalfString = firstHalfChars.join("");
  const secondHalfString = firstHalfString.split("").reverse().join("");

  return firstHalfString + middleChar + secondHalfString;
};
