/**
 * Number Of Ways To Form A Target String Given A Dictionary
 * Intuition: Columns of the dictionary are independent. DP[t][c] = ways to form target[:t] using the first c columns, skipping a column or matching target[t-1] with that column's letter count.
 * Approach: 1. Count char frequencies per column. 2. dp[0][0]=1. 3. For each target prefix length and column, add skip (same t, next column) and take (next t, next column) *= freq of needed char. 4. Mod 1e9+7; return dp[len(target)][wordLen].
 * Dry Run: words=["acca","bbbb","caca"], target="aba" → 4 ways.
 * Time Complexity: O(N * M + T * M)
 * Space Complexity: O(M + T * M)
 */
var numWays = function (words, target) {
  const primeModulo = 1e9 + 7;
  const singleWordLength = words[0].length;
  const targetStringLength = target.length;
  const characterCodeOffset = 97;

  const frequencyMatrix = Array(singleWordLength)
    .fill()
    .map(() => Array(26).fill(0));

  for (const currentWordValue of words) {
    for (
      let positionInWord = 0;
      positionInWord < singleWordLength;
      positionInWord++
    ) {
      frequencyMatrix[positionInWord][
        currentWordValue.charCodeAt(positionInWord) - characterCodeOffset
      ]++;
    }
  }

  const dynamicProgrammingMatrix = Array(targetStringLength + 1)
    .fill()
    .map(() => Array(singleWordLength + 1).fill(0));
  dynamicProgrammingMatrix[0][0] = 1;

  for (
    let targetCharacterIndex = 0;
    targetCharacterIndex <= targetStringLength;
    targetCharacterIndex++
  ) {
    for (
      let wordColumnPointer = 0;
      wordColumnPointer < singleWordLength;
      wordColumnPointer++
    ) {
      const waysFromPreviousColumn =
        dynamicProgrammingMatrix[targetCharacterIndex][wordColumnPointer];
      dynamicProgrammingMatrix[targetCharacterIndex][wordColumnPointer + 1] =
        (dynamicProgrammingMatrix[targetCharacterIndex][wordColumnPointer + 1] +
          waysFromPreviousColumn) %
        primeModulo;

      if (targetCharacterIndex < targetStringLength) {
        const desiredCharAscii =
          target.charCodeAt(targetCharacterIndex) - characterCodeOffset;
        const charOccurrencesAtCurrentColumn =
          frequencyMatrix[wordColumnPointer][desiredCharAscii];
        const waysToFormPreviousPrefix =
          dynamicProgrammingMatrix[targetCharacterIndex][wordColumnPointer];

        dynamicProgrammingMatrix[targetCharacterIndex + 1][
          wordColumnPointer + 1
        ] =
          (dynamicProgrammingMatrix[targetCharacterIndex + 1][
            wordColumnPointer + 1
          ] +
            waysToFormPreviousPrefix * charOccurrencesAtCurrentColumn) %
          primeModulo;
      }
    }
  }

  return dynamicProgrammingMatrix[targetStringLength][singleWordLength];
};
