/**
 * Longest Subsequence Repeated K Times
 * Intuition: The problem asks for the longest subsequence `seq` such that `seq * k` is itself a subsequence of the input string `s`. Among equally long valid subsequences, the lexicographically largest is preferred. This suggests a backtracking or depth-first search approach to build `seq`s.
 * The key insight is to first determine which characters can possibly appear in `seq`, and how many times each character can appear. If a character `c` appears `F_c` times in `s`, then `c` can appear at most `floor(F_c / k)` times in `seq`. This forms a pool of characters from which `seq` can be constructed.
 * Approach:
 * 1. Calculate the frequency of each character ('a' through 'z') in the input string `s`. Store these counts in an array, say `charFrequencies`.
 * 2. Construct a `characterPool` string. Iterate from 'a' to 'z'. For each character `ch`, calculate `maxOccurrences = Math.floor(charFrequencies[ch] / k)`. Append `ch` to `characterPool` `maxOccurrences` times. This `characterPool` represents the multiset of characters available for building valid `seq`s.
 * 3. Define a helper function, `checkSubsequenceValidity(candidateSeq)`. This function takes a string `candidateSeq` and checks if `candidateSeq * k` is a subsequence of `s`. It does this by using two pointers: one iterating through `s` and another iterating through the virtual string `candidateSeq * k` (using modulo arithmetic for `candidateSeq` characters). It returns `true` if all characters of `candidateSeq * k` are found in `s` in order, `false` otherwise.
 * 4. Initialize a global variable `longestAchievedSubsequence` to an empty string. This variable will store the longest lexicographically largest valid `seq` found so far.
 * 5. Implement a recursive backtracking function, say `generateSequences(currentBuiltSequence, availableCharacters)`.
 *   `currentBuiltSequence`: The `seq` currently being built.
 *   `availableCharacters`: The part of `characterPool` from which more characters can be picked.
 *   Inside `generateSequences`:
 *   First, compare `currentBuiltSequence` with `longestAchievedSubsequence`. If `currentBuiltSequence` is longer, or same length and lexicographically greater, check its validity using `checkSubsequenceValidity`. If valid, update `longestAchievedSubsequence = currentBuiltSequence`.
 *   Base Case: If `availableCharacters` is empty, return.
 *   Recursive Step: Iterate through `availableCharacters` from right to left (to prioritize lexicographically larger characters for generation). For each character `nextCharacterToAppend` at index `charSelectionIndex` in `availableCharacters`:
 *   Construct `nextPath = currentBuiltSequence + nextCharacterToAppend`.
 *   Construct `remainingForNextCall` by removing `nextCharacterToAppend` from `availableCharacters` at `charSelectionIndex`.
 *   Recursively call `generateSequences(nextPath, remainingForNextCall)`.
 * 6. Initiate the backtracking process by calling `generateSequences("", characterPool)`.
 * 7. Return `longestAchievedSubsequence`.
 * Dry Run: For `s="bababcba", k=2`:
 * 1. `charFrequencies` for 'a':3, 'b':3, 'c':1.
 * 2. `characterPool` is constructed: `floor(3/2)` for 'a' is 1, `floor(3/2)` for 'b' is 1, `floor(1/2)` for 'c' is 0. So, `characterPool = "ab"`.
 * 3. `longestAchievedSubsequence = ""`.
 * 4. Call `generateSequences("", "ab")`:
 * `currentBuiltSequence = ""`, `availableCharacters = "ab"`.
 * No update to `longestAchievedSubsequence` initially.
 * Loop `charSelectionIndex` from 1 down to 0:
 * `charSelectionIndex = 1`: `nextCharacterToAppend = 'b'`. `remainingForNextCall = "a"`.
 * Recursive call: `generateSequences("b", "a")`
 * `currentBuiltSequence = "b"`, `availableCharacters = "a"`.
 * `checkSubsequenceValidity("b")` for `s="bababcba", k=2`. `seq*k = "bb"`. This is found in `s`. Returns `true`.
 * `longestAchievedSubsequence = "b"`.
 * Loop `charSelectionIndex` from 0 down to 0:
 * `charSelectionIndex = 0`: `nextCharacterToAppend = 'a'`. `remainingForNextCall = ""`.
 * Recursive call: `generateSequences("ba", "")`
 * `currentBuiltSequence = "ba"`, `availableCharacters = ""`.
 * `checkSubsequenceValidity("ba")` for `s="bababcba", k=2`. `seq*k = "baba"`. This is found in `s`. Returns `true`.
 * `longestAchievedSubsequence = "ba"` (since "ba" is longer than "b").
 * `availableCharacters` is empty, return.
 * Loop ends, return.
 * `charSelectionIndex = 0`: `nextCharacterToAppend = 'a'`. `remainingForNextCall = "b"`.
 * Recursive call: `generateSequences("a", "b")`
 * `currentBuiltSequence = "a"`, `availableCharacters = "b"`.
 * `currentSequenceLength = 1`, `longestAchievedSubsequence.length = 2`. `1 > 2` is false. `1 === 2` is false. No update.
 * Loop `charSelectionIndex` from 0 down to 0:
 * `charSelectionIndex = 0`: `nextCharacterToAppend = 'b'`. `remainingForNextCall = ""`.
 * Recursive call: `generateSequences("ab", "")`
 * `currentBuiltSequence = "ab"`, `availableCharacters = ""`.
 * `currentSequenceLength = 2`, `longestAchievedSubsequence.length = 2`. `2 > 2` is false. `2 === 2` is true. Compare "ab" with "ba". `"ab" > "ba"` is false. No update.
 * `availableCharacters` is empty, return.
 * Loop ends, return.
 * Loop ends, return.
 * 5. Final `longestAchievedSubsequence` is "ba".
 * Time Complexity: O(N + 2^floor(N/k) * N)
 * Space Complexity: O(N)
 */
var longestSubsequenceRepeatedK = function (s, k) {
  const sourceStringLength = s.length;
  const characterFrequencies = new Array(26).fill(0);

  for (const charInstance of s) {
    characterFrequencies[charInstance.charCodeAt(0) - 97]++;
  }

  let characterPool = "";
  for (let characterCode = 0; characterCode < 26; characterCode++) {
    const totalPossibleCount = Math.floor(
      characterFrequencies[characterCode] / k,
    );
    characterPool += String.fromCharCode(97 + characterCode).repeat(
      totalPossibleCount,
    );
  }

  let longestAchievedSubsequence = "";

  const checkSubsequenceValidity = (candidateSeq) => {
    let currentMatchPointer = 0;
    const candidateSeqLength = candidateSeq.length;
    const requiredTotalLength = candidateSeqLength * k;

    if (requiredTotalLength === 0) {
      return true;
    }

    for (
      let stringIterator = 0;
      stringIterator < sourceStringLength &&
      currentMatchPointer < requiredTotalLength;
      stringIterator++
    ) {
      if (
        s[stringIterator] ===
        candidateSeq[currentMatchPointer % candidateSeqLength]
      ) {
        currentMatchPointer++;
      }
    }
    return currentMatchPointer >= requiredTotalLength;
  };

  const generateSequences = (currentBuiltSequence, availableCharacters) => {
    const currentSequenceLength = currentBuiltSequence.length;
    const longestSequenceLength = longestAchievedSubsequence.length;

    if (
      currentSequenceLength > longestSequenceLength ||
      (currentSequenceLength === longestSequenceLength &&
        currentBuiltSequence > longestAchievedSubsequence)
    ) {
      if (checkSubsequenceValidity(currentBuiltSequence)) {
        longestAchievedSubsequence = currentBuiltSequence;
      }
    }

    if (availableCharacters.length === 0) {
      return;
    }

    for (
      let charSelectionIndex = availableCharacters.length - 1;
      charSelectionIndex >= 0;
      charSelectionIndex--
    ) {
      const nextCharacterToAppend = availableCharacters[charSelectionIndex];
      const remainingForNextCall =
        availableCharacters.substring(0, charSelectionIndex) +
        availableCharacters.substring(charSelectionIndex + 1);
      generateSequences(
        currentBuiltSequence + nextCharacterToAppend,
        remainingForNextCall,
      );
    }
  };

  generateSequences("", characterPool);
  return longestAchievedSubsequence;
};
