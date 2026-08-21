/**
 * Distinct Subsequences II
 * Intuition: Each new character doubles the set of subsequences (append or not), but repeats subtract the subsequences that ended at the previous same letter so those are not counted twice. dp includes the empty subsequence; subtract 1 at the end.
 * Approach: 1. `subsequenceCounts[0]=1`; `lastSeenPosition` 26 × −1. 2. For each char: total = 2 * dp[i] mod; if seen, subtract dp[last index of that letter]. 3. Store dp[i+1], update last index. 4. Return (dp[n]−1) mod 1e9+7.
 * Dry Run: "abc". After a: 2, b: 4, c: 8, non-empty 7 (a,b,c,ab,ac,bc,abc).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var distinctSubseqII = function (s) {
  const moduloValue = 1e9 + 7;
  const subsequenceCounts = new Array(s.length + 1).fill(0);
  subsequenceCounts[0] = 1;

  const lastSeenPosition = new Array(26).fill(-1);

  for (
    let currentCharacterIndex = 0;
    currentCharacterIndex < s.length;
    currentCharacterIndex++
  ) {
    const alphabetMapping = s.charCodeAt(currentCharacterIndex) - 97;

    let currentSubsequenceTotal =
      (subsequenceCounts[currentCharacterIndex] * 2) % moduloValue;

    if (lastSeenPosition[alphabetMapping] !== -1) {
      currentSubsequenceTotal =
        (currentSubsequenceTotal -
          subsequenceCounts[lastSeenPosition[alphabetMapping]] +
          moduloValue) %
        moduloValue;
    }

    subsequenceCounts[currentCharacterIndex + 1] = currentSubsequenceTotal;
    lastSeenPosition[alphabetMapping] = currentCharacterIndex;
  }
  const resultNonEmpty =
    (subsequenceCounts[s.length] - 1 + moduloValue) % moduloValue;

  return resultNonEmpty;
};
