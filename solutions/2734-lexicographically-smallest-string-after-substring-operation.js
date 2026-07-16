/**
 * Lexicographically Smallest String After Substring Operation
 *
 * Intuition:
 * We must perform exactly one operation on a non-empty substring.
 *
 * Decreasing a character ('b'→'a', 'c'→'b', ...) always makes the string
 * lexicographically smaller, except for 'a', which becomes 'z' and makes it
 * larger.
 *
 * Therefore:
 *
 * • Skip the leading 'a's.
 * • Decrease the first continuous block of non-'a' characters.
 * • If the entire string consists of 'a's, decrease only the last character.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Convert the string into an array of characters.
 *
 * 2. Skip all leading 'a's.
 *
 * 3. If every character is 'a':
 *
 *      Change only the last character:
 *
 *          'a' → 'z'
 *
 *      Return.
 *
 * 4. Otherwise:
 *
 *      Starting from the first non-'a',
 *      keep decreasing characters until another 'a' is reached
 *      or the string ends.
 *
 * 5. Convert the array back into a string.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s = "cbabc"
 *
 * First non-'a' = 'c'
 *
 * Decrease:
 *
 * c → b
 * b → a
 *
 * Stop at 'a'
 *
 * Result:
 *
 * "baabc"
 *
 * -------------------------
 *
 * s = "aa"
 *
 * All characters are 'a'
 *
 * Last:
 *
 * a → z
 *
 * Result:
 *
 * "az"
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var smallestString = function (s) {
  const chars = s.split("");

  const n = chars.length;

  let index = 0;

  while (index < n && chars[index] === "a") {
    index++;
  }

  if (index === n) {
    chars[n - 1] = "z";
    return chars.join("");
  }

  while (index < n && chars[index] !== "a") {
    chars[index] = String.fromCharCode(chars[index].charCodeAt(0) - 1);
    index++;
  }

  return chars.join("");
};
