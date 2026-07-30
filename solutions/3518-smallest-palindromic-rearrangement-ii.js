/**
 * Smallest Palindromic Rearrangement II
 * Intuition: A palindromic string is uniquely determined by its first half and, if its length is odd, its middle character. To find the k-th lexicographically smallest palindrome, we construct its first half character by character from left to right. At each position, we try placing characters 'a' through 'z' in order. For each character `c`, we calculate how many distinct palindromic permutations could be formed if `c` were placed at the current position. If `k` (0-indexed) is less than this count, `c` is the correct character for this position. Otherwise, we subtract the count from `k` and try the next character. The primary challenge is that the number of permutations can be very large, exceeding standard integer limits, while `k` itself is relatively small (up to 10^6). This necessitates using logarithm factorials to compare permutation counts with `k` without overflow.
 *
 * Approach:
 * 1.  **Preprocessing Character Counts:**
 *     a. Count the frequencies of all characters in the input string `s`.
 *     b. If `s.length` is odd, identify the single character that appears an odd number of times. This character will be the fixed `middleChar` of the palindrome. Decrement its count in the frequency map.
 *     c. For all remaining characters, divide their counts by 2. These represent the characters available for constructing the first `halfLen = Math.floor(s.length / 2)` characters of the palindrome.
 *
 * 2.  **Precompute Log Factorials:**
 *     a. Create an array `LOG_FACTORIALS` where `LOG_FACTORIALS[i]` stores `log(i!)`.
 *     b. `LOG_FACTORIALS[0]` is initialized to `0` (since `log(0!) = log(1) = 0`).
 *     c. For `i` from 1 to `halfLen`, calculate `LOG_FACTORIALS[i] = LOG_FACTORIALS[i-1] + Math.log(i)`. This precomputation allows efficient calculation of `log(N!)` later.
 *
 * 3.  **`getPermutationsCount` Function:**
 *     a. This helper function calculates the number of distinct permutations for a given `remainingLength` and `currentCounts` of available characters.
 *     b. It uses the formula for permutations with repetitions: `N! / (c1! * c2! * ... * cn!)`, where `N` is `remainingLength` and `c_i` are `currentCounts[i]`.
 *     c. To avoid overflow, it calculates the logarithm of this formula: `log(N!) - sum(log(c_i!))`.
 *     d. It compares `logPerms` with `log(k + 1)` (where `k` is 0-indexed). If `logPerms` is significantly greater, it indicates `numPerms` is greater than `k + 1`, so we return a large value like `k + 2`. Otherwise, it returns `Math.round(Math.exp(logPerms))`, which provides an accurate count within the range relevant to `k`.
 *
 * 4.  **Constructing the First Half:**
 *     a. Convert `k` from 1-indexed to 0-indexed by `k--`.
 *     b. Initialize an empty array `resultHalf` to store the characters of the first half.
 *     c. Iterate `i` from `0` to `halfLen - 1` (for each position):
 *        i. Iterate through possible characters `charIdx` from 'a' to 'z':
 *           1. If `charCounts[charIdx]` is greater than 0:
 *              a. Temporarily decrement `charCounts[charIdx]` (simulate using this character).
 *              b. Calculate `numPerms = getPermutationsCount(halfLen - (i + 1), charCounts)`.
 *              c. If `k < numPerms`: This `charIdx` is the correct character for the current position. Add `String.fromCharCode(97 + charIdx)` to `resultHalf` and break the inner loop.
 *              d. Else (`k >= numPerms`): This character would result in lexicographically smaller permutations. Subtract `numPerms` from `k` (to skip these permutations) and increment `charCounts[charIdx]` (put the character back). Continue to the next `charIdx`.
 *     d. If at any point no character can be chosen for a position (meaning `k` was too large for the available permutations), return an empty string.
 *
 * 5.  **Final Palindrome Construction:**
 *     a. Join `resultHalf` to form `firstHalfStr`.
 *     b. Create `secondHalfStr` by reversing `resultHalf` and joining.
 *     c. Combine them: `firstHalfStr + middleChar + secondHalfStr`.
 *
 * Dry Run: s = "abba", k = 2
 * 1.  n = 4, halfLen = 2.
 *     charCounts: {'a':2, 'b':2}. middleChar = ''.
 *     charCounts (after dividing by 2): {'a':1, 'b':1}.
 * 2.  LOG_FACTORIALS: [0, log(1), log(2)] => [0, 0, 0.693...].
 * 3.  `k` becomes 1 (0-indexed).
 * 4.  resultHalf = [].
 *     i = 0 (first position):
 *        charIdx = 0 ('a'):
 *           charCounts['a']-- => {'a':0, 'b':1}.
 *           remainingLength = 1.
 *           getPermutationsCount(1, {'a':0, 'b':1}): logPerms = log(1!) - (log(0!) + log(1!)) = 0. Returns 1.
 *           numPerms = 1.
 *           Is `k < numPerms`? (1 < 1) No.
 *           `k -= numPerms` => `k = 1 - 1 = 0`.
 *           `charCounts['a']++` => {'a':1, 'b':1}.
 *        charIdx = 1 ('b'):
 *           charCounts['b']-- => {'a':1, 'b':0}.
 *           remainingLength = 1.
 *           getPermutationsCount(1, {'a':1, 'b':0}): logPerms = log(1!) - (log(1!) + log(0!)) = 0. Returns 1.
 *           numPerms = 1.
 *           Is `k < numPerms`? (0 < 1) Yes.
 *           Append 'b' to `resultHalf`. `resultHalf = ['b']`. Break.
 *     i = 1 (second position):
 *        charIdx = 0 ('a'):
 *           charCounts['a']-- => {'a':0, 'b':0}.
 *           remainingLength = 0.
 *           getPermutationsCount(0, {'a':0, 'b':0}): logPerms = log(0!) - (log(0!) + log(0!)) = 0. Returns 1.
 *           numPerms = 1.
 *           Is `k < numPerms`? (0 < 1) Yes.
 *           Append 'a' to `resultHalf`. `resultHalf = ['b', 'a']`. Break.
 * 5.  firstHalfStr = "ba".
 *     secondHalfStr = "ab".
 *     middleChar = "".
 *     Result = "ba" + "" + "ab" = "baab".
 *
 * Time Complexity: O(N + L * A)
 * Space Complexity: O(L + A)
 */
var smallestPalindrome = function (s, k) {
  const n = s.length;
  const halfLen = Math.floor(n / 2);

  const charCounts = new Array(26).fill(0);
  for (let i = 0; i < n; i++) {
    charCounts[s.charCodeAt(i) - 97]++;
  }

  let middleChar = "";
  if (n % 2 === 1) {
    for (let i = 0; i < 26; i++) {
      if (charCounts[i] % 2 === 1) {
        middleChar = String.fromCharCode(97 + i);
        charCounts[i]--;
        break;
      }
    }
  }

  for (let i = 0; i < 26; i++) {
    charCounts[i] /= 2;
  }

  const LOG_FACTORIALS = new Array(halfLen + 1);
  LOG_FACTORIALS[0] = 0;
  for (let i = 1; i <= halfLen; i++) {
    LOG_FACTORIALS[i] = LOG_FACTORIALS[i - 1] + Math.log(i);
  }

  k--;

  const getPermutationsCount = (remainingLength, currentCounts) => {
    if (remainingLength === 0) {
      return 1;
    }

    let logNumerator = LOG_FACTORIALS[remainingLength];
    let logDenominator = 0;
    for (let i = 0; i < 26; i++) {
      logDenominator += LOG_FACTORIALS[currentCounts[i]];
    }

    const logPerms = logNumerator - logDenominator;

    if (logPerms > Math.log(k + 1) + 1e-9) {
      return k + 2;
    } else {
      return Math.round(Math.exp(logPerms));
    }
  };

  const resultHalf = [];
  const currentCountsSnapshot = charCounts.slice();

  for (let i = 0; i < halfLen; i++) {
    let charFound = false;
    for (let charIdx = 0; charIdx < 26; charIdx++) {
      if (currentCountsSnapshot[charIdx] > 0) {
        currentCountsSnapshot[charIdx]--;

        const remainingLength = halfLen - (i + 1);
        const numPerms = getPermutationsCount(
          remainingLength,
          currentCountsSnapshot,
        );

        if (k < numPerms) {
          resultHalf.push(String.fromCharCode(97 + charIdx));
          charFound = true;
          break;
        } else {
          k -= numPerms;
          currentCountsSnapshot[charIdx]++;
        }
      }
    }
    if (!charFound) {
      return "";
    }
  }

  const firstHalfStr = resultHalf.join("");
  const secondHalfStr = resultHalf.reverse().join("");

  return firstHalfStr + middleChar + secondHalfStr;
};
