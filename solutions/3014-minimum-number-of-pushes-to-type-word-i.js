/**
 * Minimum Number of Pushes to Type Word I
 * Intuition: To minimize the total number of pushes, letters that appear most frequently in the input word should be assigned to key positions that require fewer presses. Since there are 8 remappable keys on a telephone keypad, the 8 most frequent letters will occupy the first push position on different keys (1 push each), the next 8 most frequent will occupy the second push position (2 pushes each), and so on.
 * Approach: 1. Initialize an array of size 26 to store the frequency of each lowercase English letter. Iterate through the input `word`, incrementing the count for each character. 2. Sort this frequency array in descending order to prioritize letters appearing most often. 3. Iterate through the sorted frequencies. For each frequency `f` at a given 0-indexed position `i`, calculate the number of pushes required per occurrence of that letter as `Math.floor(i / 8) + 1`. Multiply this push count by the letter's frequency `f` and accumulate it into a running total. 4. Return the final accumulated total pushes.
 * Dry Run: word = "aabbc"
 * 1. `letterFrequencies` initialized as `[0, ..., 0]` (26 zeros).
 * 2. Processing `word`:
 *    - 'a': `letterFrequencies[0]` becomes 1, then 2.
 *    - 'b': `letterFrequencies[1]` becomes 1, then 2.
 *    - 'c': `letterFrequencies[2]` becomes 1.
 *    Resulting `letterFrequencies`: `[2, 2, 1, 0, 0, ..., 0]`.
 * 3. `letterFrequencies.sort((firstFreq, secondFreq) => secondFreq - firstFreq)`: `letterFrequencies` remains `[2, 2, 1, 0, 0, ..., 0]` (order of the two '2's might swap, but numerical content and effective positions remain the same for calculation).
 * 4. Calculate `totalPushesAccumulator`:
 *    - `frequencyIndex = 0`: `currentFrequencyValue = 2`. `pressPosition = Math.floor(0 / 8) + 1 = 1`. `totalPushesAccumulator = 0 + (2 * 1) = 2`.
 *    - `frequencyIndex = 1`: `currentFrequencyValue = 2`. `pressPosition = Math.floor(1 / 8) + 1 = 1`. `totalPushesAccumulator = 2 + (2 * 1) = 4`.
 *    - `frequencyIndex = 2`: `currentFrequencyValue = 1`. `pressPosition = Math.floor(2 / 8) + 1 = 1`. `totalPushesAccumulator = 4 + (1 * 1) = 5`.
 *    - `frequencyIndex = 3`: `currentFrequencyValue = 0`. Loop breaks as no more letters to consider.
 * 5. Return `totalPushesAccumulator = 5`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumPushes = function (word) {
  const letterFrequencies = new Array(26).fill(0);

  for (const characterInput of word) {
    const charCodeOffset = characterInput.charCodeAt(0) - 97;
    letterFrequencies[charCodeOffset]++;
  }

  letterFrequencies.sort((firstFreq, secondFreq) => secondFreq - firstFreq);

  let totalPushesAccumulator = 0;
  const keySlots = 8;

  for (
    let frequencyIndex = 0;
    frequencyIndex < letterFrequencies.length;
    frequencyIndex++
  ) {
    const currentFrequencyValue = letterFrequencies[frequencyIndex];
    if (currentFrequencyValue === 0) {
      break;
    }

    const pressPosition = Math.floor(frequencyIndex / keySlots) + 1;
    totalPushesAccumulator += currentFrequencyValue * pressPosition;
  }

  return totalPushesAccumulator;
};
