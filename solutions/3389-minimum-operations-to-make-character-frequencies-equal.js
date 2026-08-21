/**
 * Minimum Operations to Make Character Frequencies Equal
 * Intuition: A good string has every present letter occurring the same number of times. Try every target frequency up to the max count. Letters can be deleted, inserted, or changed into the next letter (a→b→...→z).
 * Approach: 1. Count frequencies of a–z. 2. For each target t in 1..maxCount, DP from z down to a. 3. For letter i: delete all, or insert/delete to t, plus dp[i+1]; optionally change surplus/all of i into i+1 when i+1 is short of t, then dp[i+2].
 * Dry Run: s = "acab". counts a:2,c:1,b:1. Target 1 can delete one 'a' → 1 op. Target 2 needs more inserts. Answer 1.
 * Time Complexity: O(N)  // 26 * maxFrequency, maxFrequency ≤ N
 * Space Complexity: O(1)
 */

var makeStringGood = function (s) {
  const letterCounts = new Array(26).fill(0);
  for (const character of s) {
    letterCounts[character.charCodeAt(0) - 97]++;
  }

  let minimumOperations = s.length;
  const maxFrequency = Math.max(...letterCounts);
  for (
    let targetFrequency = 1;
    targetFrequency <= maxFrequency;
    targetFrequency++
  ) {
    minimumOperations = Math.min(
      minimumOperations,
      getMinOperations(letterCounts, targetFrequency)
    );
  }
  return minimumOperations;
};

function getMinOperations(letterCounts, targetFrequency) {
  const minOpsFromLetter = new Array(27).fill(0);

  for (let letterIndex = 25; letterIndex >= 0; letterIndex--) {
    const deleteAllToZero = letterCounts[letterIndex];
    const deleteOrInsertToTarget = Math.abs(
      targetFrequency - letterCounts[letterIndex]
    );
    minOpsFromLetter[letterIndex] =
      Math.min(deleteAllToZero, deleteOrInsertToTarget) +
      minOpsFromLetter[letterIndex + 1];

    if (
      letterIndex + 1 < 26 &&
      letterCounts[letterIndex + 1] < targetFrequency
    ) {
      const nextDeficit = targetFrequency - letterCounts[letterIndex + 1];
      const needToChange =
        letterCounts[letterIndex] > targetFrequency
          ? letterCounts[letterIndex] - targetFrequency
          : letterCounts[letterIndex];
      const changeToTarget =
        nextDeficit > needToChange
          ? needToChange + (nextDeficit - needToChange)
          : nextDeficit + (needToChange - nextDeficit);
      minOpsFromLetter[letterIndex] = Math.min(
        minOpsFromLetter[letterIndex],
        changeToTarget + minOpsFromLetter[letterIndex + 2]
      );
    }
  }

  return minOpsFromLetter[0];
}
