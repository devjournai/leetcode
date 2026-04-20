/**
 * Count Substrings That Differ By One Character
 * Time Complexity: O(s.length * t.length)
 * Space Complexity: O(s.length * t.length)
 */
var countSubstrings = function (s, t) {
  const sLength = s.length;
  const tLength = t.length;

  let totalAnswer = 0;

  const dpForwardMatches = Array(sLength + 1)
    .fill(null)
    .map(() => Array(tLength + 1).fill(0));

  for (let stringSRow = 1; stringSRow <= sLength; stringSRow++) {
    for (let stringTCol = 1; stringTCol <= tLength; stringTCol++) {
      if (s[stringSRow - 1] === t[stringTCol - 1]) {
        dpForwardMatches[stringSRow][stringTCol] =
          dpForwardMatches[stringSRow - 1][stringTCol - 1] + 1;
      } else {
        dpForwardMatches[stringSRow][stringTCol] = 0;
      }
    }
  }

  const dpBackwardMatches = Array(sLength + 1)
    .fill(null)
    .map(() => Array(tLength + 1).fill(0));

  for (let reverseSRow = sLength - 1; reverseSRow >= 0; reverseSRow--) {
    for (let reverseTCol = tLength - 1; reverseTCol >= 0; reverseTCol--) {
      if (s[reverseSRow] === t[reverseTCol]) {
        dpBackwardMatches[reverseSRow][reverseTCol] =
          dpBackwardMatches[reverseSRow + 1][reverseTCol + 1] + 1;
      } else {
        dpBackwardMatches[reverseSRow][reverseTCol] = 0;
      }
    }
  }

  for (
    let currentSCharacterIndex = 0;
    currentSCharacterIndex < sLength;
    currentSCharacterIndex++
  ) {
    for (
      let currentTCharacterIndex = 0;
      currentTCharacterIndex < tLength;
      currentTCharacterIndex++
    ) {
      if (s[currentSCharacterIndex] !== t[currentTCharacterIndex]) {
        const leftContiguousMatches =
          dpForwardMatches[currentSCharacterIndex][currentTCharacterIndex];
        const rightContiguousMatches =
          dpBackwardMatches[currentSCharacterIndex + 1][
            currentTCharacterIndex + 1
          ];

        totalAnswer +=
          (leftContiguousMatches + 1) * (rightContiguousMatches + 1);
      }
    }
  }

  return totalAnswer;
};
