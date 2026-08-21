/**
 * Can Make Palindrome From Substring
 * Intuition: A substring can become a palindrome with k replacements iff the number of odd-count letters is at most 2k+1 (odds can pair off with replacements, one odd may stay in the center). Prefix frequency arrays answer each query in O(26).
 * Approach: 1. prefix[i+1][c] = count of c in s[0..i]. 2. For query [L,R,k], oddCount = how many letters have odd (prefix[R+1]-prefix[L]). 3. Push oddCount <= 2k+1.
 * Dry Run: s = "abcda", query [3,3,0].
 *   - Substring "d": one odd letter, 1 <= 1. True.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var canMakePaliQueries = function (s, queries) {
  const stringLength = s.length;
  const alphabetSize = 26;

  const prefixCharacterTallies = Array.from({ length: stringLength + 1 }, () =>
    Array(alphabetSize).fill(0)
  );

  let stringIndex = 0;
  while (stringIndex < stringLength) {
    const charValue = s.charCodeAt(stringIndex) - 97;
    const previousTallies = prefixCharacterTallies[stringIndex];
    const currentTallies = Array.from(previousTallies);
    currentTallies[charValue]++;
    prefixCharacterTallies[stringIndex + 1] = currentTallies;
    stringIndex++;
  }

  const queryResults = [];
  let queryIndex = 0;
  while (queryIndex < queries.length) {
    const currentQueryData = queries[queryIndex];
    const queryStart = currentQueryData[0];
    const queryEnd = currentQueryData[1];
    const queryLimit = currentQueryData[2];

    let oddCountForSubstring = 0;
    let charCodeWalker = 0;
    while (charCodeWalker < alphabetSize) {
      const endCount = prefixCharacterTallies[queryEnd + 1][charCodeWalker];
      const startCount = prefixCharacterTallies[queryStart][charCodeWalker];
      const charOccurrence = endCount - startCount;
      if (charOccurrence % 2 !== 0) {
        oddCountForSubstring++;
      }
      charCodeWalker++;
    }

    const canFormPalindrome = oddCountForSubstring <= 2 * queryLimit + 1;
    queryResults.push(canFormPalindrome);
    queryIndex++;
  }

  return queryResults;
};
