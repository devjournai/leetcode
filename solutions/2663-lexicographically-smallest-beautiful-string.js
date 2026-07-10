/**
 * Lexicographically Smallest Beautiful String
 *
 * Intuition:
 * We need the smallest beautiful string that is strictly larger than `s`.
 *
 * Similar to finding the next lexicographical permutation:
 *
 * • Try to increase the string from right to left.
 * • Once a position is increased successfully, greedily fill every remaining
 *   position with the smallest valid character.
 *
 * A string is beautiful if it contains no palindrome of length ≥ 2.
 *
 * Since every palindrome of length greater than 2 contains either:
 *
 * • a palindrome of length 2, or
 * • a palindrome of length 3,
 *
 * it is sufficient to ensure:
 *
 *      s[i] != s[i-1]
 *      s[i] != s[i-2]
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Convert the string into an array.
 *
 * 2. Traverse from right to left.
 *
 * 3. For every position,
 *    try every larger character.
 *
 * 4. A character is valid if:
 *
 *      current != previous
 *      current != two positions before
 *
 * 5. After fixing one position,
 *    greedily fill every later position using
 *    the smallest valid character.
 *
 * 6. Return the constructed string.
 *
 * 7. If no position can be increased,
 *    return "".
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s =
 *
 * "abcz"
 *
 * k = 26
 *
 * Start from end.
 *
 * 'z'
 *
 * cannot increase.
 *
 * Move left.
 *
 * 'c'
 *
 * increase to
 *
 * 'd'
 *
 * Remaining position:
 *
 * choose smallest valid
 *
 * 'a'
 *
 * Result:
 *
 * "abda"
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × K)
 * Space Complexity: O(N)
 */

var smallestBeautifulString = function (s, k) {
  const chars = s.split("");

  const n = chars.length;

  const valid = (index, ch) => {
    if (index > 0 && chars[index - 1] === ch) {
      return false;
    }

    if (index > 1 && chars[index - 2] === ch) {
      return false;
    }

    return true;
  };

  for (let i = n - 1; i >= 0; i--) {
    for (
      let code = chars[i].charCodeAt(0) + 1;
      code < "a".charCodeAt(0) + k;
      code++
    ) {
      const candidate = String.fromCharCode(code);

      if (!valid(i, candidate)) {
        continue;
      }

      chars[i] = candidate;

      for (let j = i + 1; j < n; j++) {
        for (let c = 0; c < k; c++) {
          const nextChar = String.fromCharCode("a".charCodeAt(0) + c);

          if (valid(j, nextChar)) {
            chars[j] = nextChar;
            break;
          }
        }
      }

      return chars.join("");
    }
  }

  return "";
};
