/**
 * Hash Divided String
 * Intuition: s is split into consecutive blocks of length k. Each block hashes to one lowercase letter via the sum of letter indices mod 26.
 * Approach: 1. Walk i in steps of k. 2. Sum s[j] - 'a' over the k characters. 3. Append String.fromCharCode('a' + sum % 26).
 * Dry Run:
 *   s = "abcd", k = 2
 *   "ab" -> (0+1)%26 = 1 -> "b"; "cd" -> (2+3)%26 = 5 -> "f". Result "bf".
 * Time Complexity: O(n)
 * Space Complexity: O(n / k)
 */
var stringHash = function (s, k) {
  let ans = "";

  for (let i = 0; i < s.length; i += k) {
    let sumHash = 0;
    for (let j = i; j < i + k; j++) {
      sumHash += s.charCodeAt(j) - 97;
    }
    ans += String.fromCharCode(97 + (sumHash % 26));
  }

  return ans;
};
