/**
 * Bulls And Cows
 * Intuition: Matching digits in the same position are bulls. Remaining digits contribute cows equal to the overlap of their frequency counts (digits 0-9).
 * Approach: 1. For each index, if secret[i]===guess[i] increment bulls; else increment secret and guess freq arrays. 2. Sum min(secretFreq[d], guessFreq[d]) for d=0..9 as cows. 3. Return `${bulls}A${cows}B`.
 * Dry Run: secret="1807", guess="7810".
 *   - Index 1 is a bull (8). Leftover 1,0,7 vs 7,1,0 → 3 cows.
 *   - Return "1A3B".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var getHint = function (secret, guess) {
  let currentBulls = 0;
  let potentialCows = 0;

  const secretDigitsFrequency = new Array(10).fill(0);
  const guessDigitsFrequency = new Array(10).fill(0);

  const commonLength = secret.length;

  for (
    let currentIterationIndex = 0;
    currentIterationIndex < commonLength;
    currentIterationIndex++
  ) {
    const secretCharacter = secret[currentIterationIndex];
    const guessCharacter = guess[currentIterationIndex];

    if (secretCharacter === guessCharacter) {
      currentBulls++;
    } else {
      secretDigitsFrequency[parseInt(secretCharacter)]++;
      guessDigitsFrequency[parseInt(guessCharacter)]++;
    }
  }

  for (let digitIndex = 0; digitIndex <= 9; digitIndex++) {
    potentialCows += Math.min(
      secretDigitsFrequency[digitIndex],
      guessDigitsFrequency[digitIndex]
    );
  }

  return `${currentBulls}A${potentialCows}B`;
};
