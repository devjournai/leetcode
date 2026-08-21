/**
 * Buddy Strings
 * Intuition: Swap two letters in s to match goal. Need equal length. Zero mismatches works iff some letter repeats. Exactly two mismatches must be a swap pair. One or >2 mismatches fail.
 * Approach: 1. Lengths differ → false. 2. Scan: record mismatch indices (abort if >2) and frequencies (`hasRepeatingChar`). 3. 0 mismatches → hasRepeatingChar. 4. 2 mismatches: s[i]==goal[j] and s[j]==goal[i]. Else false.
 * Dry Run: s="ab", goal="ba" → two mismatches that swap → true. s="aa", goal="aa" → zero mismatches, repeat 'a' → true. "ab","ab" → false.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var buddyStrings = function (s, goal) {
  const firstStringLength = s.length;
  const secondStringLength = goal.length;

  if (firstStringLength !== secondStringLength) {
    return false;
  }

  const mismatchPositions = [];
  const charFrequencyMap = new Map();
  let hasRepeatingChar = false;

  for (
    let traverseIndex = 0;
    traverseIndex < firstStringLength;
    ++traverseIndex
  ) {
    const charFromS = s[traverseIndex];
    const charFromGoal = goal[traverseIndex];

    if (charFromS !== charFromGoal) {
      mismatchPositions.push(traverseIndex);
    }

    if (mismatchPositions.length > 2) {
      return false;
    }

    const currentCharCount = (charFrequencyMap.get(charFromS) || 0) + 1;
    charFrequencyMap.set(charFromS, currentCharCount);
    if (currentCharCount > 1) {
      hasRepeatingChar = true;
    }
  }

  if (mismatchPositions.length === 0) {
    return hasRepeatingChar;
  }

  if (mismatchPositions.length === 2) {
    const firstMismatchIndex = mismatchPositions[0];
    const secondMismatchIndex = mismatchPositions[1];

    const sValAtFirst = s[firstMismatchIndex];
    const goalValAtFirst = goal[firstMismatchIndex];
    const sValAtSecond = s[secondMismatchIndex];
    const goalValAtSecond = goal[secondMismatchIndex];

    return sValAtFirst === goalValAtSecond && sValAtSecond === goalValAtFirst;
  }

  return false;
};
